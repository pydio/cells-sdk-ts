import {useEffect, useState, useCallback} from 'react'
import './App.css'
import Node from './Node'
import axios from "axios";
import {useDropzone} from 'react-dropzone'
import { S3ServiceException, S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { AwsCredentialIdentity } from "@smithy/types";

import {RestNode, RestNodeCollection, NodeServiceApi} from "cells-sdk-ts";
import Preview from "./Preview.tsx";

import { v4 as uuidv4 } from 'uuid';

const putObject = async (client: S3Client, filePath:string, file: File) => {
    const bucketName = 'io'
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

const putObjectMultipart = async (client: S3Client, filePath:string, file: File) => {
    const nodeId = uuidv4()
    const versionId = uuidv4()
    console.log("MULTIPART Sending", nodeId, versionId)
    try{
        const upload = new Upload({
            client: client,
            partSize: 10 * 1024 * 1024,
            queueSize: 1,
            leavePartsOnError: true,
            params: {
                Bucket: 'io',
                Key: filePath,
                Body: file,
                ContentType: file.type,
                ContentLength: file.size,
                Metadata:{
                    "Draft-Mode": "true",
                    "Create-Resource-Uuid": nodeId,
                    "Create-Version-Id": versionId
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

function App() {
    const [current, setCurrent] = useState<RestNode>({Uuid:'', Path:'/', Type:'COLLECTION'})
    const [coll, setColl] = useState<RestNodeCollection|null>(null)
    const [selection, setSelection] = useState<string|''>('')
    const [renameExisting, setRenameExisting] = useState<boolean>(true)
    const [useMultipart, setUseMultipart] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const localSettings = localStorage.getItem('showSettings')
    const [showSettings, setShowSettings] = useState<boolean>(localSettings ? (localSettings === 'true') :  true)
    const [basePath, setBasePath] = useState<string>(localStorage.getItem('basePath')||'')
    const [apiKey, setApiKey] = useState<string>(localStorage.getItem('apiKey')||'')

    const getParent   = (n:RestNode):RestNode => {
        const pp = n.Path!.split('/')
        pp.pop()
        const parentPath = pp.join('/')
        return {Uuid: '', Path: parentPath, Type:'COLLECTION'}
    }
    const getClients = useCallback(() => {
        const instance = axios.create({
            baseURL: basePath+'/a',
            timeout: 60000,
            headers: {'Authorization': 'Bearer ' + apiKey}
        });
        const api= new NodeServiceApi(undefined, undefined, instance)
        const provider = async ():Promise<AwsCredentialIdentity> =>{
            return {
                accessKeyId:apiKey,
                secretAccessKey:'gatewaysecret',
            }
        }
        const client = new S3Client({
            endpoint:basePath,
            forcePathStyle: true,
            region:'us-east',
            credentials: provider,
            requestChecksumCalculation: 'WHEN_REQUIRED'
        })
        return {api, client}
    }, [basePath, apiKey])

    const {api, client} = getClients()
    const loadCurrent = ():void => {
        setLoading(true)
        api.lookup({Locators:{Many:[{Path:current.Path+'/*'}]}}).then(res => {
            setColl(res.data)
            setLoading(false)
        }).catch(err => {console.log(err); setLoading(false) })
    }

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
                if(renameExisting && data.Results.length && data.Results[0].Exists){
                    fPath = data.Results[0].NextPath
                }
                const callback = useMultipart ? putObjectMultipart : putObject
                callback(client, fPath, file).then(()=>{
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

    }, [basePath, apiKey, current, renameExisting, useMultipart])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    useEffect(() => { setSelection(''); loadCurrent()}, [current, apiKey, basePath])
    useEffect(() => {
        localStorage.setItem('apiKey', apiKey)
        localStorage.setItem('basePath', basePath)
        localStorage.setItem('showSettings', showSettings ? 'true' : 'false')
    }, [apiKey, basePath, showSettings])

    const children = (coll && coll.Nodes) || []
    children.sort((a,b) => {
        if(a.IsRecycleBin) {
            return 1
        } else if (b.IsRecycleBin) {
            return -1
        }
        const kA = a.Type+'_'+a.Path
        const kB = b.Type+'_'+b.Path
        return kA.localeCompare(kB)
    })

    let file;
    if(selection) {
        file = children.find((child) => child.Path === selection)
    }
    const insideWorkspace = current.Path.length > 1

    return (
        <>
            <div>
                <h4 onClick={() => setShowSettings(!showSettings)} style={{marginBottom:0, cursor:'pointer'}}>Api Settings&nbsp;<a>{showSettings?'-':'+'}</a>
                </h4>
                <div style={{display: showSettings ? 'block' : 'none'}}>
                    <div>
                        <input style={{width: 300}} type={"text"} placeholder={"Full URL without trailing slash"}
                               value={basePath}
                               onChange={(e) => setBasePath(e.target.value)}/>
                    </div>
                    <div>
                        <input style={{width: 300}} type={"text"} placeholder={"Api Key"} value={apiKey}
                               onChange={(e) => setApiKey(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h2 style={{flex: 1}}>{insideWorkspace?'Folder '+current.Path:'Workspaces'} {loading && '⏳'}</h2>
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
                            <input type={"checkbox"} id={"multipart"} checked={useMultipart}
                                   onChange={() => setUseMultipart(!useMultipart)} onClick={(e) => {
                                e.stopPropagation()
                            }}/>
                            <label style={{cursor: 'pointer'}} htmlFor={"multipart"} onClick={(e) => {
                                e.stopPropagation()
                            }}>Use Multipart</label>
                            <input type={"checkbox"} id={"rename"} checked={renameExisting}
                                   onChange={() => setRenameExisting(!renameExisting)} onClick={(e) => {
                                e.stopPropagation()
                            }}/>
                            <label style={{cursor: 'pointer'}} htmlFor={"rename"} onClick={(e) => {
                                e.stopPropagation()
                            }}>Auto-rename existing files</label>
                        </div>
                    </div>
                </>
            }
            <div className="card" style={{display: 'flex', alignItems: 'start'}}>
            <div style={{flex: 1}}>
                    <div style={{overflowX: 'auto'}}>
                        {insideWorkspace && <div onClick={() => setCurrent(getParent(current))} style={{cursor:'pointer'}}>⬆️ ..</div>}
                        {children.map((n) =>
                            <Node key={n.Path} n={n} api={api} setCurrent={setCurrent}
                                  selected={selection === n.Path}
                                  setSelection={setSelection}/>
                        )}
                    </div>
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
                    />}
                </div>
            </div>
            <p className="read-the-docs">
                Wicked ! Made by Charles with love
            </p>
        </>
    )
}

export default App
