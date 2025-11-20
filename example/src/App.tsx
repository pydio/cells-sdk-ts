import {useEffect, useState, useCallback, Fragment, useMemo} from 'react'
import './App.css'
import Node from './Node'
import axios from "axios";
import {useDropzone} from 'react-dropzone'
import { S3ServiceException, S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { AwsCredentialIdentity } from "@smithy/types";

import {RestNode, RestNodeCollection, NodeServiceApi, RestFlag} from "cells-sdk-ts";
import Preview from "./Preview.tsx";

import { v4 as uuidv4 } from 'uuid';
import {LookupFilterMetaFilter, TreeNodeType} from "../../models";
import {useDebounce} from '@uidotdev/usehooks'

const putObject = async (client: S3Client, bucketName: string, filePath:string, file: File) => {
    const nodeId = uuidv4()
    const versionId = uuidv4()
    console.log("Sending", nodeId, versionId)
    const command = new PutObjectCommand({
        Bucket:"io",
        Body: file,
        Key: filePath,
        ContentType: file.type,
        ContentLength: file.size,
        Metadata:{
            "Draft-Mode": "true",
            "Create-Resource-Uuid": nodeId,
            "Create-Version-Id": versionId
        },
    })
    try {
        await client.send(command);
    } catch (caught) {
        if (
            caught instanceof S3ServiceException &&
            caught.name === "EntityTooLarge"
        ) {
            console.error(
                `Error from S3 while uploading object to ${bucketName}. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`,
            );
        } else if (caught instanceof S3ServiceException) {
            console.error(
                `Error from S3 while uploading object to ${bucketName}.  ${caught.name}: ${caught.message}`,
            );
        } else {
            throw caught;
        }
    }
}

const putObjectMultipart = async (client: S3Client, bucketName:string, filePath:string, file: File) => {
    const nodeId = uuidv4()
    const versionId = uuidv4()
    console.log("MULTIPART Sending", nodeId, versionId)
    try{
        const upload = new Upload({
            client: client,
            partSize: 10 * 1024 * 1024,
            queueSize: 3,
            leavePartsOnError: true,
            params: {
                Bucket: bucketName,
                Key: filePath,
                Body: file,
                ContentType: file.type,
                //ContentLength: file.size,
                Metadata:{
                    "Draft-Mode": "true",
                    "Create-Resource-Uuid": nodeId,
                    "Create-Version-Id": versionId,
                    "Pydio-Clear-Size": `${file.size}`
                },
            },
        });
        upload.on("httpUploadProgress", ({ loaded, total }) => {
            console.log(loaded, total);
        });
        await upload.done();
    } catch (caught) {
        if (caught instanceof Error && caught.name === "AbortError") {
            console.error(`Multipart upload was aborted. ${caught.message}`);
        } else {
            throw caught;
        }
    }
}

const Checkbox = ({id, checked, onChange, label=''}: {id: string, checked: boolean, onChange:()=>void, label: string}) => {
    return (
        <Fragment>
            <input key={id+'-cb'} type={"checkbox"} id={id} checked={checked} onChange={() => onChange()} onClick={(e) => {
                e.stopPropagation()
            }}/>
            <label key={id+'-lb'} style={{cursor: 'pointer'}} htmlFor={id} onClick={(e) => {
                e.stopPropagation()
            }}>{label}</label>
        </Fragment>
    )
}

function App() {
    const [current, setCurrent] = useState<RestNode>({Uuid:'', Path:'/', Type:'COLLECTION'})
    const [coll, setColl] = useState<RestNodeCollection|null>(null)
    const [selection, setSelection] = useState<string|''>('')
    const [renameExisting, setRenameExisting] = useState<boolean>(true)
    const [useMultipart, setUseMultipart] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)

    const localSettings = localStorage.getItem('showSettings')
    const [showSettings, setShowSettings] = useState<boolean>(localSettings ? (localSettings === 'true') :  true)
    const [basePath, setBasePath] = useState<string>(localStorage.getItem('basePath')||'')
    const [restSegment, setRestSegment] = useState<string>(localStorage.getItem('restSegment')||'/v2')
    const [s3URL, setS3URL] = useState<string>(localStorage.getItem('s3URL')||'')
    const [s3Bucket, setS3Bucket] = useState<string>(localStorage.getItem('s3Bucket')||'io')
    const [apiKey, setApiKey] = useState<string>(localStorage.getItem('apiKey')||'')
    const [zUserHeader, setZUserHeader] = useState(false)

    const [searchText, setSearchText] = useState<string>('')
    const debouncedSearchText = useDebounce(searchText, 300);
    const [sortField, setSortField] = useState<string>('')
    const [sortDesc, setSortDesc] = useState<boolean>(false)

    const [recursive, setRecursive] = useState(true)
    const [deleted, setDeleted] = useState(false)
    const [filterType, setFilterType] = useState<TreeNodeType>(TreeNodeType.Unknown)
    const [filterLinks, setFilterLinks] = useState(false)
    const [filterDrafts, setFilterDrafts] = useState(false)
    const [filterTag, setFilterTag] = useState(false)
    const setFilterTypeTyped = (s: string) => {
        switch (s) {
            case 'LEAF':
                setFilterType(TreeNodeType.Leaf)
                break
            case 'COLLECTION':
                setFilterType(TreeNodeType.Collection)
                break
            default:
                setFilterType(TreeNodeType.Unknown)
        }
    }

    const [showPreviews, setShowPreviews] = useState(false);
    const [lookupFlags, setLookupFlags] = useState<RestFlag[]>([RestFlag.WithVersionsAll, RestFlag.WithPreSignedUrls, RestFlag.WithEditorUrls])
    const allFlags:RestFlag[] = [
        RestFlag.WithVersionsAll,
        RestFlag.WithPreSignedUrls,
        RestFlag.WithEditorUrls,
        RestFlag.WithMetaNone,
    ]

    const toggleFlag = useCallback((flag:RestFlag) => {
        const set = !lookupFlags.find(f => f === flag)
        if (set) {
            setLookupFlags([...lookupFlags, flag])
        } else {
            setLookupFlags([...lookupFlags.filter(f => f !== flag)])
        }
    }, [lookupFlags])

    const toggleSortField = useCallback((f: string) => {
        if(f === sortField){
            if(!sortDesc) {
                setSortDesc(true)
            } else {
                setSortField('')
                setSortDesc(false)
            }
        } else {
            setSortField(f)
            setSortDesc(false)
        }
    }, [sortField, sortDesc])

    const allFields:string[] = [
        "mtime",
        "size",
        "usermeta-owner-uuid",
        "usermeta-tags"
    ]
    const allFieldsLabels:string[] = [
        "Time",
        "Size",
        "Owner",
        "Tag"
    ]

    const getParent   = (n:RestNode):RestNode => {
        const pp = n.Path!.split('/')
        pp.pop()
        const parentPath = pp.join('/')
        return {Uuid: '', Path: parentPath, Type:'COLLECTION'}
    }
    const userUnqualified = useMemo(() => {
        if(zUserHeader) {
            try{
                return apiKey.split(':')[1].split('@')[0]
            } catch(e) {
                console.error(e)
            }
        }
        return '';
    }, [apiKey, zUserHeader]);
    const getClients = useCallback(() => {
        interface headersInterface{
            Authorization?:string
            'Z-User'?: string
        }
        const headers:headersInterface = {Authorization: 'Bearer ' + apiKey}
        if(userUnqualified) {
            headers.Authorization = 'Bearer z-auth-secret-token'
            try{
                headers['Z-User'] = userUnqualified
            } catch(e) {
                console.error(e)
            }
        }
        const instance = axios.create({
            baseURL: basePath+restSegment,
            timeout: 60000,
            headers: headers
        });
        const api= new NodeServiceApi(undefined, undefined, instance)
        const provider = async ():Promise<AwsCredentialIdentity> =>{
            return {
                accessKeyId:userUnqualified?'z-auth-secret-token':apiKey,
                secretAccessKey:'gatewaysecret',
            }
        }
        const client = new S3Client({
            endpoint:s3URL || basePath,
            forcePathStyle: true,
            region:'us-east-1',
            credentials: provider,
            requestChecksumCalculation: 'WHEN_REQUIRED',
        })
        if (userUnqualified) {
            client.middlewareStack.add(
                (next) => (args) => {
                    // @ts-expect-error-ignore
                    args.request.headers["Z-User"] = userUnqualified;
                    return next(args);
                },
                {
                    step: "build",
                }
            )
        }
        return {api, client}
    }, [basePath, apiKey, restSegment, s3URL, userUnqualified])

    const {api, client} = useMemo( () => getClients(), [getClients])

    const loadCurrent = useCallback((offset=0):void => {
        setLoading(true)
        const Metadata: LookupFilterMetaFilter[] = []
        if(filterTag) {
            Metadata.push({Namespace:'usermeta-tags', Term:'*', Operation: 'Must'})
        }
        api.lookup({
            Scope: {
                Root:{Path: current.Path},
                Recursive: recursive
            },
            Filters: {
                Text:{SearchIn: 'BaseName', Term:debouncedSearchText},
                Status: {
                    Deleted: deleted?'Only':'Not',
                    HasPublicLink: filterLinks,
                    IsDraft: filterDrafts
                },
                Metadata: Metadata,
                Type: filterType
            },
            SortField:sortField,
            SortDirDesc:sortDesc,
            Flags:lookupFlags,
            Offset: offset>0?`${offset}`:'0',
            Limit: "30"
        }).then(res => {
            setColl(res.data)
            setLoading(false)
        }).catch(err => {console.log(err); setLoading(false) })
    }, [api, current, lookupFlags, debouncedSearchText, sortField, sortDesc, setColl, setLoading, deleted, recursive, filterType, filterLinks, filterDrafts, filterTag])

    const createNode = (type:string) => {
        const name = window.prompt('Name?', type==='folder'?'New Folder': 'Empty File.txt')
        if(!name) {
            return
        }
        setLoading(true)
        api.create({
            Inputs:[{
                Type:type=='folder'?'COLLECTION':'LEAF',
                Locator:{Path:current.Path+'/'+name.normalize('NFC')},
                DraftMode: true,
                ResourceUuid: uuidv4(),
                VersionId:type !== 'folder'?uuidv4():''
            }]}).then(()=>{
            loadCurrent()
            setLoading(false)
        }).catch((e) => {window.alert(e.message); setLoading(false) })
    }

    const onDrop = useCallback((acceptedFiles:File[]) => {
        acceptedFiles.forEach((file) => {

            let fPath = current.Path+'/'+file.name
            fPath = fPath.normalize('NFC')
            setLoading(true)
            api.createCheck({
                Inputs: [{Type:'LEAF', Locator:{Path:fPath}}],
                FindAvailablePath: true
            }).then(({data})=>{
                if(renameExisting && data.Results && data.Results.length && data.Results[0].Exists){
                    fPath = data.Results[0].NextPath!
                }
                const callback = useMultipart ? putObjectMultipart : putObject
                callback(client, s3Bucket, fPath, file).then(()=>{
                    console.log('uploaded', fPath)
                    loadCurrent()
                    setLoading(false)
                }).catch((e) => {
                    console.error(e)
                    setLoading(false)
                })
            }).catch(() => {
                setLoading(false)
            })
        })

    }, [api, client, current.Path, loadCurrent, renameExisting, s3Bucket, useMultipart])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    useEffect(() => { setSelection(''); loadCurrent()}, [current, apiKey, basePath, restSegment, loadCurrent])
    useEffect(() => { loadCurrent() }, [debouncedSearchText, loadCurrent]);
    useEffect(() => { loadCurrent() }, [lookupFlags, sortField, sortDesc, deleted, recursive, filterType, filterLinks, filterDrafts, filterTag, loadCurrent])
    useEffect(() => {
        localStorage.setItem('apiKey', apiKey)
        localStorage.setItem('basePath', basePath)
        localStorage.setItem('restSegment', restSegment)
        localStorage.setItem('s3URL', s3URL)
        localStorage.setItem('s3Bucket', s3Bucket)
        localStorage.setItem('showSettings', showSettings ? 'true' : 'false')
    }, [apiKey, basePath, showSettings, restSegment, s3URL, s3Bucket])


    const children = (coll && coll.Nodes) || []
    const pagination = (coll && coll.Pagination) || {}

    let file;
    if(selection) {
        file = children.find((child) => child.Path === selection)
    }
    const insideWorkspace = current.Path.length > 1
    const filterStyle = {
        borderRadius: 10,
        marginRight: 5,
        padding: '2px 10px',
        border: "2px dashed grey"
    }

    return (
        <>
            <div>
                <h4 onClick={() => setShowSettings(!showSettings)} style={{marginBottom:0, cursor:'pointer'}}>Api Settings&nbsp;<a>{showSettings?'-':'+'}</a>
                </h4>
                <div style={{display: showSettings ? 'block' : 'none'}}>
                    <div style={{height:26, display:'flex', alignItems: 'center'}}>
                        <label style={{width:100, fontSize:12,margin: '0 10px'}} htmlFor={"input-rest"}>REST Endpoint</label>
                        <input id={"input-rest"} style={{width: 300}} type={"text"} placeholder={"Full URL without trailing slash"}
                               value={basePath}
                               onChange={(e) => setBasePath(e.target.value)}/>
                        <input style={{width: 100}} type={"text"} placeholder={"REST API main endpoint"}
                               value={restSegment}
                               onChange={(e) => setRestSegment(e.target.value)}/>
                    </div>
                    <div style={{height:26, display:'flex', alignItems: 'center'}}>
                        <label style={{width:100, fontSize:12,margin: '0 10px'}} htmlFor={"input-s3"}>S3 Endpoint</label>
                        <input id={"input-s3"} style={{width: 300}} type={"text"}
                               placeholder={"Leave empty to use " + basePath}
                               value={s3URL}
                               onChange={(e) => setS3URL(e.target.value)}/>
                        <input style={{width: 100}} type={"text"} placeholder={"S3 Bucket"}
                               value={s3Bucket}
                               onChange={(e) => setS3Bucket(e.target.value)}/>
                    </div>
                    <div style={{height:26, display:'flex', alignItems: 'center'}}>
                        <label style={{width:100, fontSize: 12, margin: '0 10px'}} htmlFor={"input-token"}>Auth Token</label>
                        <input id={"input-token"} style={{width: 408}} type={"text"} placeholder={"Api Key"} value={apiKey}
                               onChange={(e) => setApiKey(e.target.value)}/>
                        <Checkbox id={"zuser"} checked={zUserHeader} onChange={()=>setZUserHeader(!zUserHeader)} label={"Use Z-User"}/>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h2 style={{flex: 1}}>{insideWorkspace?'Folder '+current.Path:'Workspaces'} {loading && '⏳'}</h2>
                <div style={{zoom: 0.8}}>
                    Lookup Flags :
                    {allFlags.map(f =>
                        <Checkbox key={f} id={f} checked={!!lookupFlags.find(lf => lf === f)} onChange={() => toggleFlag(f)} label={f.replace('With', '')}/>
                    )}
                    {lookupFlags.indexOf("WithPreSignedURLs") > -1 &&
                        <Checkbox key={'previews'} id={'previews'} checked={showPreviews} onChange={() => setShowPreviews(!showPreviews)} label={'Previews'}/>
                    }
                </div>
                <button onClick={() => loadCurrent()}>Reload</button>
            </div>
            {insideWorkspace &&
                <>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <button onClick={() => createNode('folder')}>Create Folder</button>
                        <button onClick={() => createNode('file')}>Create File</button>
                    </div>
                    <div {...getRootProps()} style={{
                        marginTop: 10,
                        border: '2px dashed grey',
                        padding: 20,
                        borderRadius: 20,
                        backgroundColor: (isDragActive ? 'rgba(90,157,75,0.2)' : 'transparent')
                    }}>
                        <input {...getInputProps()} />
                        <div style={{display: 'flex'}}>
                            <div style={{flex: 1}}>Drag 'n' drop some files here, or <a>click to select files</a></div>
                            <Checkbox id={"multipart"} checked={useMultipart} onChange={() => setUseMultipart(!useMultipart)} label={"Use Multipart"}/>
                            <Checkbox id={"rename"} checked={renameExisting}  onChange={() => setRenameExisting(!renameExisting)} label={"Auto-rename existing files"}/>
                        </div>
                    </div>
                </>
            }
            <div style={{display:'flex', alignItems:'center', paddingTop: 10}}>
                <div style={filterStyle}>
                <input style={{width: 256, paddingRight:30}} type={"text"} placeholder={"Search files in " + (current.Path?current.Path:'all conversations')} value={searchText}
                           onChange={(e) => setSearchText(e.target.value)}/>
                </div>
                <div style={filterStyle}>
                    Sort By: {allFields.map((field, index) => {
                    const active = sortField === field
                    return <a style={{color: "white"}} key={field} onClick={() => toggleSortField(field)}>
                        <span style={{cursor:'pointer', color:'inherit', textDecoration: active ? 'underline' : 'none'}}>{allFieldsLabels[index]}</span> {active && (sortDesc ? '↓' : '↑')} </a>
                })}
                </div>
                <div style={filterStyle}>
                    <select value={filterType} onChange={(e) => setFilterTypeTyped(e.target.value)}>
                        <option value={TreeNodeType.Unknown}>Files & Folders</option>
                        <option value={TreeNodeType.Leaf}>Files</option>
                        <option value={TreeNodeType.Collection}>Folders</option>
                    </select>
                </div>
                <div style={filterStyle}><Checkbox id={'deleted'} checked={deleted} onChange={()=> setDeleted(!deleted)} label={'Deleted'}/></div>
                <div style={filterStyle}><Checkbox id={'links'} checked={filterLinks} onChange={()=> setFilterLinks(!filterLinks)} label={'Links'}/></div>
                <div style={filterStyle}><Checkbox id={'drafts'} checked={filterDrafts} onChange={()=> setFilterDrafts(!filterDrafts)} label={'Drafts'}/></div>
                <div style={filterStyle}><Checkbox id={'tagged'} checked={filterTag} onChange={()=> setFilterTag(!filterTag)} label={'Tagged'}/></div>
                <div style={filterStyle}><Checkbox id={'recursive'} checked={recursive} onChange={()=> setRecursive(!recursive)} label={'Search Recursive'}/></div>
            </div>
            <div className="card" style={{display: 'flex', alignItems: 'start'}}>
                <div style={{flex: 1}}>
                    <div style={{overflowX: 'auto'}}>
                        {insideWorkspace && <div onClick={() => setCurrent(getParent(current))} style={{cursor:'pointer'}}>⬆️ ..</div>}
                        {children.map((n) =>
                            <Node key={n.Path} n={n} api={api} setCurrent={setCurrent}
                                  selected={selection === n.Path}
                                  setSelection={setSelection}
                                  multiScope={!!debouncedSearchText || filterLinks || filterDrafts || filterTag || deleted}
                                  showPreview={showPreviews}
                            />
                        )}
                    </div>
                    {pagination && pagination.TotalPages && pagination.TotalPages > 1 && (
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', marginTop: 20}}>
                            {pagination.CurrentPage && pagination.CurrentPage > 1 && <button onClick={() => loadCurrent(pagination.PrevOffset)}>← Previous Page</button>}
                            <div style={{margin:'0 10px'}}>Page {pagination.CurrentPage} out of {pagination.TotalPages}</div>
                            {pagination.NextOffset && <button onClick={() => loadCurrent(pagination.NextOffset)}>Next Page →</button>}
                        </div>
                    )}
                </div>
                <div style={{flex: 2}}>
                    {file && <Preview
                        api={api}
                        client={client}
                        n={file}
                        loadCurrent={loadCurrent}
                        setSelection={setSelection}
                        loading={loading}
                        setLoading={setLoading}
                        lookupFlags={lookupFlags}
                    />}
                </div>
            </div>
            <p className="read-the-docs">
                Wicked ! Made by Charles with love - [Hint] Right-click on folders to show their info
            </p>
        </>
    )
}

export default App
