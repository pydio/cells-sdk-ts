import {NodeServiceApi, RestNode} from "cells-sdk-ts";
import {getBase} from "./tools.tsx";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import {filesize} from 'filesize'

interface props {
    n:RestNode,
    setCurrent: (n:RestNode) => void,
    setSelection: (s:string) => void,
    selected: boolean,
    api: NodeServiceApi
}
const Node = (props:props)=> {

    const {n, setCurrent, selected, setSelection} = props;

    let isWorkspace
    let icon = n.Type == 'COLLECTION' ? '📂' : '📄'
    let hasTag = false;
    if(n.IsRecycleBin){
        icon = '🗑️'
    } else if (n.ContextWorkspace){
        icon = '🗂️'
        isWorkspace = true
    }
    const metaStyle = {marginLeft:10,opacity:0.5, fontSize:'0.8em'}
    if(n.UserMetadata) {
        hasTag = !!n.UserMetadata.find(m => m.Namespace === 'usermeta-tags');
    }

    return (
        <div
            style={{
                whiteSpace:'nowrap', cursor:'pointer',
                backgroundColor:selected?'rgba(255,255,255,0.2)':'transparent',
                padding:'2px '+ (isWorkspace ? '0' : '10px'),
                borderRadius:5
            }}
            onClick={() => (n.Type == 'COLLECTION' ? setCurrent(n) : setSelection(n.Path))}
            onContextMenu={(e) => {e.preventDefault(); setSelection(n.Path)}}
        >
            {icon} {getBase(n)}

            {n.Modified && <span style={metaStyle}>{dayjs(parseInt(n.Modified)*1000).fromNow()}</span>}
            {n.Type === 'LEAF' && n.Size && <span style={metaStyle}>{filesize(parseInt(n.Size), {standard: "jedec"})}</span>}
            {n.IsBookmarked && ' ⭐'}
            {n.Subscriptions && ' 🔔'}
            {hasTag && ' 🏷️'}
            {n.IsDraft && ' 📝'}
            {n.ContentLock && ' 🔒'}
            {n.Shares && ' 🔗'}
        </div>
    )

}

export default Node;