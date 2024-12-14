import {useEffect, useState} from 'react'
import './App.css'
import Node from './Node'

import {Configuration, NodeServiceApi, RestNode, RestNodeCollection} from "../../index.ts";
import Preview from "./Preview.tsx";

function App() {
    const [current, setCurrent] = useState<RestNode>({path:'/', type:'COLLECTION'})
    const [coll, setColl] = useState<RestNodeCollection|null>(null)
    const [selection, setSelection] = useState<string|''>('')
    const [showSettings, setShowSettings] = useState<boolean>(true)

    const [basePath, setBasePath] = useState<string>(localStorage.getItem('basePath')||'')
    const [apiKey, setApiKey] = useState<string>(localStorage.getItem('apiKey')||'')

    const apiConfig = new Configuration({
        basePath:basePath,
        headers:{
            'Authorization':'Bearer ' + apiKey
        }
    })
    const getParent   = (n:RestNode):RestNode => {
        const pp = n.path!.split('/')
        pp.pop()
        const parentPath = pp.join('/')
        return {path: '/' + parentPath, type:'COLLECTION'}
    }

    const api = new NodeServiceApi(apiConfig)

    const loadCurrent = ():void => {
        api.lookup({body: {locators:{many:[{path:current.path+'/*'}]}}}).then(res => {
            setColl(res)
        })
    }

    const createNode = (type:string) => {
        const name = window.prompt('Name?', type==='folder'?'New Folder': 'Empty File.txt')
        if(!name) {
            return
        }
        api.create({body: {inputs:[{type:type=='folder'?'COLLECTION':'LEAF', locator:{path:current.path+'/'+name}}]}}).then((res)=>{
            console.log(res)
            loadCurrent()
        }).catch((e) => {window.alert(e.message)})
    }

    useEffect(() => { setSelection(''); loadCurrent()}, [current, apiKey, basePath])
    useEffect(() => {
        localStorage.setItem('apiKey', apiKey)
        localStorage.setItem('basePath', basePath)
    }, [apiKey, basePath])

    const children = (coll && coll.nodes) || []
    children.sort((a,b) => {
        if(a.isRecycleBin) {
            return 1
        } else if (b.isRecycleBin) {
            return -1
        }
        const kA = a.type+'_'+a.path
        const kB = b.type+'_'+b.path
        return kA.localeCompare(kB)
    })

    let file;
    if(selection) {
        file = children.find((child) => child.path === selection)
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
            <h2>Folder {current.path}</h2>
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
                            <Node key={n.path} n={n} api={api} setCurrent={setCurrent}
                                  selected={selection === n.path}
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
