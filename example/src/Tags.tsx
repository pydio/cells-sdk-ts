import {RestNode, NodeServiceApi} from "cells-sdk-ts";
import {useState, useEffect, CSSProperties, useCallback, KeyboardEvent} from "react";
import {getBase} from "./tools.tsx";

interface props {
    api: NodeServiceApi
    n: RestNode,
    loadCurrent: () => void,
    onRequestClose: () => void,
}

const Tags = ({api, n, loadCurrent, onRequestClose}:props) => {

    const [values, setValues] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [crtValues, setCrtValues] = useState<string[]>([])
    const [freeValue, setFreeValue] = useState('')

    const [scrollY, setScrollY] = useState(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        api.listNamespaceValues('usermeta-tags').then((res)=> {
            const vv = res.data.Values || []
            setValues(vv)
        })
    }, [api]);

    useEffect(() => {
        setCrtValues([])
        if(n.UserMetadata) {
            const meta = n.UserMetadata.find(m => m.Namespace === 'usermeta-tags')
            if(meta) {
                try{
                    const vv = JSON.parse(meta.JsonValue).split(',')
                    setCrtValues(vv)
                }catch (e){
                    console.error(e)
                }
            }
        }
    }, [n]);

    const modalStyle:CSSProperties = {
        position: 'absolute',       /* Fixes to the viewport */
        left:'10%',
        right:'10%',
        top: scrollY + 30,
        height:'80%',
        zIndex: 1000,
        border: '2px solid',
        padding:20,
        borderRadius: 20,
        display:'flex',
        flexDirection:'column'
    }

    const tagStyle:CSSProperties =  {
        display:'inline-flex',
        alignItems:'center',
        height:28,
        backgroundColor:'lightblue',
        color: 'darkblue',
        margin:5,
        padding:'0 10px',
        borderRadius:8
    }

    const tagAction: CSSProperties = {
        display:'inline-flex',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: 10,
        cursor:'pointer',
        height: 14,
        width: 14,
        lineHeight:'14px',
        border:'1px solid darkblue',
        borderRadius:'50%'
    }

    const handler = useCallback((action:string,tag:string)=>{
        let newValues = [...crtValues]
        if(action === 'add'){
            newValues = [...newValues, tag]
        } else {
            newValues = crtValues.filter(v => v != tag)
        }
        const stringValues = newValues.join(',')
        setLoading(true)
        return api.patchNode(n.Uuid!, {
            MetaUpdates:[
                {
                    Operation: stringValues ? 'PUT' :'DELETE',
                    UserMeta:{Namespace:'usermeta-tags', JsonValue:JSON.stringify(stringValues)}
                }
            ]}).then(()=>{
            setLoading(false)
            loadCurrent()
        }).catch(() => {
            setLoading(false)
        });

    }, [crtValues, setLoading, api, loadCurrent, n])

    const addFree = useCallback(() => {
        if(!freeValue) {
            return
        }
        handler('add', freeValue).then(() => {setFreeValue('')})
    }, [freeValue, handler])

    const enter = useCallback((e:KeyboardEvent) => {
        if(e.key === 'Enter') {
            addFree()
        }
    }, [addFree])

    return (
        <div style={modalStyle} className={'modal-panel'}>
            <h2 style={{marginTop:0}}>Tags for '{getBase(n)}'</h2>
            <h3>Known Values</h3>
            <div style={{display:'flex', alignItems:'center', flexWrap:'wrap'}}>
                {values.filter(v => !!v && crtValues.indexOf(v) === -1).map((v,index) =>
                (
                    <span style={tagStyle} key={'tag-'+index}>
                        {v}<span onClick={()=>handler('add', v)} style={tagAction}>+</span>
                    </span>
                )
            )}
                <span key={'tag-input'} style={tagStyle}>
                    <input placeholder={'free value'} onKeyDown={enter} type={'text'} value={freeValue} onChange={(e)=>setFreeValue(e.target.value)}/>
                    <span onClick={addFree} style={tagAction}>+</span>
                </span>
            </div>
            {crtValues &&
                <div style={{borderTop: '1px solid', marginTop: 10, paddingTop: 10}}>
                    <h3>File Values</h3>
                    <div style={{display:'flex', alignItems:'center', flexWrap:'wrap'}}>Current Values: {crtValues.map((v, index) =>
                        (
                            <span  onClick={()=>handler('del', v)} style={tagStyle} key={'tag-'+index}>{v}<span style={tagAction}>-</span></span>
                        )
                    )}</div>
                </div>
            }
            {loading && <div>loading...</div>}
            <div style={{flex: 1}}></div>
            <div style={{textAlign:'right'}}>
                <button onClick={() => onRequestClose()}>Close</button>
            </div>
        </div>
    )

}

export {Tags}