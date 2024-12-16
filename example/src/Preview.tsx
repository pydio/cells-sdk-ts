import {NodeServiceApi, RestActionParameters, RestNode, RestPerformActionResponse, RestShareLink} from "../../axios";
import {getBase} from "./tools.tsx";
import {useEffect, useState} from "react";

interface props {
    api: NodeServiceApi
    n: RestNode,
    loadCurrent: any
}

const Preview = (props:props) => {
    const [link, setLink] = useState<RestShareLink|null>(null)
    const {api,n, loadCurrent} = props;
    const del = () => {
        api.performAction('delete', {Nodes:[{Path:n.Path}]}).then(()=>{
            setTimeout(loadCurrent, 1500)
        })
    }

    const bookmark = () => {
        api.patchNode(n.Uuid!,{Bookmark:{Value:!n.IsBookmarked}}).then(()=>{
            loadCurrent()
        })
    }

    const publicLink = ()=> {
        if(n.Shares && n.Shares.length>0) {
            api.deletePublicLink(n.Shares[0].Uuid!).then(()=>{
                loadCurrent()
            })
        } else {
            api.createPublicLink(n.Uuid!, {
                Link:{
                    Label:getBase(n),
                    Permissions:["Preview", "Download"]
                },
            }).then((link) => {
                console.log(link)
                loadCurrent()
            })
        }
    }

    const rename = (wait=false) => {
        const pp = n.Path!.split('/')
        const base = pp.pop()||''
        const newName = window.prompt("New name:", base)
        if(!newName) {
            return
        }
        pp.push(newName)
        const req:RestActionParameters = {
            Nodes:[{Path:n.Path}],
            TargetNode:{Path:pp.join('/')},
            JsonParameters:'{"targetParent":false}'
        }
        if (wait) {
            req.AwaitStatus= 'Running'
            req.AwaitTimeout = '2500ms'
        }
        api.performAction("move", req).then((res)=>{
            if(wait) {
                const data:RestPerformActionResponse = res.data
                const jobUuid = data.Tasks![0].JobUuid || ''
                if(jobUuid) {
                    const intID = setInterval(()=>{
                        api.backgroundActionInfo("move", jobUuid).then((info)=>{
                            if (info.data.Status === 'Finished'){
                                loadCurrent()
                                clearInterval(intID)
                            }
                        })
                    }, 500)
                }
            } else {
                setTimeout(loadCurrent, 500)
            }
        })
    }

    const tagUntag = () => {
        const isTagged = n.UserMetadata && n.UserMetadata.find((m) => m.Namespace === 'usermeta-tags');
        api.patchNode(n.Uuid!, {
            MetaUpdates:[
                {
                    Operation:isTagged?'DELETE':'PUT',
                    UserMeta:{Namespace:'usermeta-tags', JsonValue:JSON.stringify("zetag")}
                }
            ]}).then(()=>{
            loadCurrent()
        });
    }

    useEffect(() => {
        if (n.Shares && n.Shares.length >0 ) {
            api.getPublicLink(n.Shares[0].Uuid!).then(res => {
                setLink(res.data)
            })
        } else {
            setLink(null)
        }
    }, [n]);

    return (
        <div style={{
            backgroundColor:'rgba(255,255,255,0.2)',
            padding:10,
            borderRadius:5,
            marginLeft:5
        }}>
            <div>
                {n.Path!.split('/').length > 1 &&
                    <>
                    <button onClick={() => rename()}>Rename (async)</button>
                    <button onClick={() => rename(true)}>Rename (sync)</button>
                    </>
                }
                <button onClick={() => del()}>Delete</button>
                <button onClick={()=> bookmark()}>Bookmark</button>
                <button onClick={()=> tagUntag()}>Toggle Tag</button>
                <button onClick={()=> publicLink()}>Public Link</button>
            </div>
            <pre>{JSON.stringify(props.n, null, '  ')}</pre>
            {link &&
                <>
                    <h3>Public Link</h3>
                    <pre>{JSON.stringify(link, null, '  ')}</pre>
                </>
            }
        </div>
    )
}

export default Preview