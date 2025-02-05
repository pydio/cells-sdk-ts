import {NodeServiceApi, RestActionParameters, RestNode, RestVersion, RestPerformActionResponse, RestShareLink} from "cells-sdk-ts";
import {getBase} from "./tools.tsx";
import {useEffect, useState} from "react";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'


interface props {
    api: NodeServiceApi
    client: S3Client
    n: RestNode,
    loadCurrent: () => void,
    setSelection: (s:string) => void,
    loading: boolean,
    setLoading: (s: boolean) => void
}

const Preview = (props:props) => {
    const [link, setLink] = useState<RestShareLink|null>(null)
    const [versions, setVersions] = useState<RestVersion[]>([])
    const [byUuid, setByUuid] = useState<RestNode|null>(null)
    const [previewURL, setPreviewURL] = useState('')

    const {api, n, client, loadCurrent, setSelection, setLoading} = props;

    useEffect(() => {
        if(n.Previews && n.Previews.length > 0 && n.Previews[0].Key) {
            const prev = n.Previews.find(p => p.Dimension == 300) || n.Previews[0]
            const command = new GetObjectCommand({
                Bucket: prev.Bucket,
                Key: prev.Key
            });
            getSignedUrl(client, command, { expiresIn: 3600 }).then((url) => {
                setPreviewURL(url)
            }).catch(()=>{
                setPreviewURL('')
            })
        } else {
            setPreviewURL('')
        }
    }, [n]);

    const del = () => {
        setLoading(true)
        api.performAction('delete', {Nodes:[{Path:n.Path}]}).then(()=>{
            setTimeout(loadCurrent, 1500)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }

    const loadByUuid = () => {
        setLoading(true)
        api.getByUuid(n.Uuid).then(res=>{
            setByUuid(res.data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }

    const bookmark = () => {
        setLoading(true)
        api.patchNode(n.Uuid,{Bookmark:{Value:!n.IsBookmarked}}).then(()=>{
            loadCurrent()
        }).catch(() => {
            setLoading(false)
        })
    }

    const publicLink = ()=> {
        setLoading(true)
        if(n.Shares && n.Shares.length>0) {
            api.deletePublicLink(n.Shares[0].Uuid!).then(()=>{
                loadCurrent()
            }).catch(() => {
                setLoading(false)
            })
        } else {
            api.createPublicLink(n.Uuid, {
                Link:{
                    Label:getBase(n),
                    Permissions:["Preview", "Download"]
                },
            }).then((link) => {
                console.log(link)
                loadCurrent()
            }).catch(() => {
                setLoading(false)
            })
        }
    }

    const rename = (wait=false) => {
        const pp = n.Path.split('/')
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
        setLoading(true)
        api.performAction("move", req).then((res)=>{
            if(wait) {
                const data:RestPerformActionResponse = res.data
                let jobUuid = ''
                if(data.BackgroundActions && data.BackgroundActions.length) {
                    jobUuid = data.BackgroundActions[0].JobUuid
                }
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
                setLoading(false)
            } else {
                setTimeout(loadCurrent, 500)
                setLoading(false)
            }
        }).catch(() => {
            setLoading(false)
        })
    }

    const tagUntag = () => {
        setLoading(true)
        const isTagged = n.UserMetadata && n.UserMetadata.find((m) => m.Namespace === 'usermeta-tags');
        api.patchNode(n.Uuid!, {
            MetaUpdates:[
                {
                    Operation:isTagged?'DELETE':'PUT',
                    UserMeta:{Namespace:'usermeta-tags', JsonValue:JSON.stringify("zetag")}
                }
            ]}).then(()=>{
            setLoading(false)
            loadCurrent()
        }).catch(() => {
            setLoading(false)
        });
    }

    const publish= () => {
        setLoading(true)
        api.publishNode(n.Uuid!, {Cascade: true}).then(()=>{
            setLoading(false)
            loadCurrent()
        }).catch(() => {
            setLoading(false)
        })
    }

    const promote = () => {
        setLoading(true)
        const draft = versions.find((v) => v.Draft)
        if (!draft) {
            return
        }
        api.promoteVersion(n.Uuid, draft.VersionId, {Publish:true}).then(()=>{
            setLoading(false)
            loadCurrent()
        }).catch(() => {
            setLoading(false)
        })
    }

    const deleteDraft = () => {
        setLoading(true)
        const draft = versions.find((v) => v.Draft)
        if (!draft) {
            return
        }
        api.deleteVersion(n.Uuid, draft.VersionId).then(()=>{
            setLoading(false)
            loadCurrent()
        }).catch(() => {
            setLoading(false)
        })

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

    useEffect(() => {
        setVersions([])
        if(n.Type === 'LEAF' && n.DataSourceFeatures && n.DataSourceFeatures.Versioned) {
            api.nodeVersions(n.Uuid!, {}).then(res => {
                setVersions(res.data.Versions||[])
            })
        }
    }, [n]);

    useEffect(() => {
        setByUuid(null);
    }, [n]);

    const buttonStyle = {style:{marginBottom:'10px'}};
    const versionsHasDraft = versions.find((v) => v.Draft);

    return (
        <div style={{
            backgroundColor:'rgba(255,255,255,0.2)',
            padding:10,
            borderRadius:5,
            marginLeft:5
        }}>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1, display: 'flex', flexWrap: 'wrap'}}>
                    {n.Path!.split('/').length > 1 &&
                        <>
                            <button onClick={() => rename()} {...buttonStyle}>Rename (async)</button>
                            <button onClick={() => rename(true)} {...buttonStyle}>Rename (sync)</button>
                        </>
                    }
                    <button onClick={() => del()} {...buttonStyle}>Delete</button>
                    <button onClick={() => bookmark()} {...buttonStyle}>Bookmark</button>
                    <button onClick={() => tagUntag()} {...buttonStyle}>Toggle Tag</button>
                    <button onClick={() => publicLink()} {...buttonStyle}>Public Link</button>
                    <button onClick={() => loadByUuid()} {...buttonStyle}>By UUID</button>
                    {n.Type === 'COLLECTION' && n.IsDraft && <button onClick={() => publish()} {...buttonStyle}>Publish</button>}
                    {n.Type === 'LEAF' && versionsHasDraft && <button onClick={() => promote()} {...buttonStyle}>Promote Draft</button>}
                    {n.Type === 'LEAF' && versionsHasDraft && <button onClick={() => deleteDraft()} {...buttonStyle}>Cancel Draft</button>}
                </div>
                <div style={{width: 20, cursor:'pointer'}} onClick={() => setSelection('')}>❌</div>
            </div>
            {previewURL && <img src={previewURL}/>}
            <pre>{JSON.stringify(props.n, null, '  ')}</pre>
            {link &&
                <>
                    <h3>Public Link</h3>
                    <pre>{JSON.stringify(link, null, '  ')}</pre>
                </>
            }
            {versions && versions.length > 0 &&
                <>
                    <h3>Versions</h3>
                    <pre>{JSON.stringify(versions, null, '  ')}</pre>
                </>
            }
            {byUuid &&
                <>
                    <h3>Loaded By Uuid</h3>
                    <pre>{JSON.stringify(byUuid, null, '  ')}</pre>
                </>
            }
        </div>
    )
}

export default Preview