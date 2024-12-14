import {NodeServiceApi, PerformActionRequest, RestNode} from "../../index.ts";

interface props {
    api: NodeServiceApi
    n: RestNode,
    loadCurrent: any
}

const Preview = (props:props) => {
    const {api,n, loadCurrent} = props;
    const del = () => {
        api.performAction({name:'delete', parameters:{nodes:[{path:n.path}]}}).then(()=>{
            setTimeout(loadCurrent, 1500)
        })
    }

    const bookmark = () => {
        api.patchNode({uuid:n.uuid!, nodeUpdates:{bookmark:{value:!n.isBookmarked}}}).then(()=>{
            loadCurrent()
        })
    }

    const rename = (wait=false) => {
        const pp = n.path!.split('/')
        const base = pp.pop()||''
        const newName = window.prompt("New name:", base)
        if(!newName) {
            return
        }
        pp.push(newName)
        const req:PerformActionRequest = {
            name:'move',
            parameters:{
                nodes:[{path:n.path}],
                targetNode:{path:pp.join('/')},
                jsonParameters:'{"targetParent":false}'
            }
        }
        if (wait) {
            req.parameters.awaitStatus= 'Running'
            req.parameters.awaitTimeout = '2500ms'
        }
        api.performAction(req).then((res)=>{
            if(wait) {
                const jobUuid = res.tasks![0].jobUuid || ''
                const intID = setInterval(()=>{
                    api.backgroundActionInfo({name:'move', jobUuid:jobUuid}).then((info)=>{
                        if (info.status === 'Finished'){
                            loadCurrent()
                            clearInterval(intID)
                        }
                    })
                }, 500)
            } else {
                setTimeout(loadCurrent, 500)
            }
        })
    }

    const tagUntag = () => {
        const isTagged = n.userMetadata && n.userMetadata.find((m) => m.namespace === 'usermeta-tags');
        api.patchNode({
            uuid:n.uuid!,
            nodeUpdates:{
                metaUpdates:[
                    {
                        operation:isTagged?'DELETE':'PUT',
                        userMeta:{namespace:'usermeta-tags', jsonValue:JSON.stringify("zetag")}
                    }
                ]
            }}).then(()=>{
            loadCurrent()
        });
    }


    return (
        <div style={{
            backgroundColor:'rgba(255,255,255,0.2)',
            padding:10,
            borderRadius:5,
            marginLeft:5
        }}>
            <div>
                {n.path!.split('/').length > 1 &&
                    <>
                    <button onClick={() => rename()}>Rename (async)</button>
                    <button onClick={() => rename(true)}>Rename (sync)</button>
                    </>
                }
                <button onClick={() => del()}>Delete</button>
                <button onClick={()=> bookmark()}>Bookmark</button>
                <button onClick={()=> tagUntag()}>Toggle Tag</button>
            </div>
            <pre>
                {JSON.stringify(props.n, null, '  ')}
            </pre>
        </div>
    )
}

export default Preview