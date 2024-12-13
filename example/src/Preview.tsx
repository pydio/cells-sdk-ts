import {NodeServiceApi, RestNode} from "../../index.ts";

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

    const tagUntag = () => {
        let isTagged = n.userMetadata && n.userMetadata.find((m) => m.namespace === 'usermeta-tags');
        api.patchNode({
            uuid:n.uuid!,
            nodeUpdates:{
                metaUpdates:[
                    {
                        operation:isTagged?'DELETE':'PUT',
                        userMeta:{namespace:'usermeta-tags', jsonValue:'\"zetag\"'}
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
                <button onClick={()=> del()}>Delete</button>
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