import {useEffect, useState, useCallback} from 'react'
import './App.css'
import Node from './Node'
import axios from "axios";
import {useDropzone} from 'react-dropzone'
import { S3ServiceException, S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { AwsCredentialIdentity } from "@smithy/types";

import {RestNode, RestNodeCollection, NodeServiceApi} from "../../axios";
import Preview from "./Preview.tsx";

const putObject = async (client: S3Client, filePath:string, file: File) => {
    const bucketName = 'io'
    const command = new PutObjectCommand({
        Bucket:"io",
        Body: file,
        Key: filePath,
        ContentType: file.type,
        ContentLength: file.size,
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

function App() {
    const [current, setCurrent] = useState<RestNode>({Uuid:'', Path:'/', Type:'COLLECTION'})
    const [coll, setColl] = useState<RestNodeCollection|null>(null)
    const [selection, setSelection] = useState<string|''>('')
    const [showSettings, setShowSettings] = useState<boolean>(true)
    const [renameExisting, setRenameExisting] = useState<boolean>(true)

    const [basePath, setBasePath] = useState<string>(localStorage.getItem('basePath')||'')
    const [apiKey, setApiKey] = useState<string>(localStorage.getItem('apiKey')||'')

    const getParent   = (n:RestNode):RestNode => {
        const pp = n.Path!.split('/')
        pp.pop()
        const parentPath = pp.join('/')
        return {Uuid: '', Path: '/' + parentPath, Type:'COLLECTION'}
    }
    const getClients = useCallback(() => {
        const instance = axios.create({
            baseURL: basePath,
            timeout: 1000,
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
            endpoint:basePath.replace('/a', ''),
            forcePathStyle: true,
            region:'us-east',
            credentials: provider,
        })
        return {api, client}
    }, [basePath, apiKey])

    const {api, client} = getClients()
    const loadCurrent = ():void => {
        api.lookup({Locators:{Many:[{Path:current.Path+'/*'}]}}).then(res => {
            setColl(res.data)
        })
    }

    const createNode = (type:string) => {
        const name = window.prompt('Name?', type==='folder'?'New Folder': 'Empty File.txt')
        if(!name) {
            return
        }
        api.create({Inputs:[{Type:type=='folder'?'COLLECTION':'LEAF', Locator:{Path:current.Path+'/'+name}}]}).then(()=>{
            loadCurrent()
        }).catch((e) => {window.alert(e.message)})
    }

    const onDrop = useCallback((acceptedFiles:File[]) => {
        acceptedFiles.forEach((file) => {

            let fPath = current.Path+'/'+file.name
            api.createCheck({
                Inputs: [{Type:'LEAF', Locator:{Path:fPath}}],
                FindAvailablePath: true
            }).then(({data})=>{
                if(renameExisting && data.Results.length && data.Results[0].Exists){
                    fPath = data.Results[0].NextPath
                }
                putObject(client, fPath, file).then(()=>{
                    console.log('uploaded', fPath)
                    loadCurrent()
                }).catch((e) => {
                    console.error(e)
                })
            })
        })

    }, [basePath, apiKey, current, renameExisting])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    useEffect(() => { setSelection(''); loadCurrent()}, [current, apiKey, basePath])
    useEffect(() => {
        localStorage.setItem('apiKey', apiKey)
        localStorage.setItem('basePath', basePath)
    }, [apiKey, basePath])

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

    return (
        <>
            <h2>Api Settings <a onClick={() => setShowSettings(!showSettings)}>+</a></h2>
            <div style={{display: showSettings ? 'block' : 'none'}}>
                <div>
                    <input style={{width: 300}} type={"text"} placeholder={"enter full URL with base (must allow CORS)"}
                           value={basePath}
                           onChange={(e) => setBasePath(e.target.value)}/>
                </div>
                <div>
                    <input style={{width: 300}} type={"text"} placeholder={"enter api key"} value={apiKey}
                           onChange={(e) => setApiKey(e.target.value)}/>
                </div>
            </div>
            <h2>Folder {current.Path}</h2>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <button onClick={() => createNode('folder')}>Create Folder</button>
                <button onClick={() => createNode('file')}>Create File</button>
                <input type={"checkbox"} id={"rename"} checked={renameExisting} onChange={()=>setRenameExisting(!renameExisting)} />
                <label style={{cursor:'pointer'}} htmlFor={"rename"}>Auto-rename</label>
                <div style={{flex: 1}}/>
                <button onClick={() => loadCurrent()}>Reload</button>
            </div>
            <div className="card" style={{display: 'flex', alignItems: 'start'}}>
                <div style={{flex: 1}}>
                    <div style={{overflowX: 'auto'}}>
                        <div onClick={() => setCurrent(getParent(current))}>📂..</div>
                        {children.map((n) =>
                            <Node key={n.Path} n={n} api={api} setCurrent={setCurrent}
                                  selected={selection === n.Path}
                                  setSelection={setSelection}/>
                        )}
                    </div>
                </div>
                <div style={{flex: 2}}>
                    {file && <Preview api={api} client={client} n={file} loadCurrent={loadCurrent}/>}
                </div>
            </div>
            {current.Path.length > 1 &&
                <div {...getRootProps()} style={{
                    border: '2px dashed grey',
                    padding: '10px 20px',
                    borderRadius: 20,
                    backgroundColor: (isDragActive ? 'rgba(255,255,255,0.2)' : 'transparent')
                }}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            }
            <p className="read-the-docs">
                Wicked ! Made by Charles with love
            </p>
        </>
    )
}

export default App
