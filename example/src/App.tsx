import {useEffect, useState} from 'react'
import './App.css'
import Node from './Node'
import axios from "axios";

import {RestNode, RestNodeCollection, NodeServiceApi} from "../../axios";
import Preview from "./Preview.tsx";

function App() {
    const [current, setCurrent] = useState<RestNode>({Uuid:'', Path:'/', Type:'COLLECTION'})
    const [coll, setColl] = useState<RestNodeCollection|null>(null)
    const [selection, setSelection] = useState<string|''>('')
    const [showSettings, setShowSettings] = useState<boolean>(true)

    const [basePath, setBasePath] = useState<string>(localStorage.getItem('basePath')||'')
    const [apiKey, setApiKey] = useState<string>(localStorage.getItem('apiKey')||'')


    const getParent   = (n:RestNode):RestNode => {
        const pp = n.Path!.split('/')
        pp.pop()
        const parentPath = pp.join('/')
        return {Uuid: '', Path: '/' + parentPath, Type:'COLLECTION'}
    }

    const instance = axios.create({
        baseURL: basePath,
        timeout: 1000,
        headers: {'Authorization': 'Bearer ' + apiKey}
    });
    const api= new NodeServiceApi(undefined, undefined, instance)


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
            <div style={{display: 'flex'}}>
                <button onClick={() => createNode('folder')}>Create Folder</button>
                <button onClick={() => createNode('file')}>Create File</button>
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
                    {file && <Preview api={api} n={file} loadCurrent={loadCurrent}/>}
                </div>
            </div>
            <p className="read-the-docs">
                Wicked ! Made by Charles with love
            </p>
        </>
    )
}

export default App
