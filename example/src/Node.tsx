import React from 'react'
import {NodeServiceApi, RestNode} from "cells-sdk-ts";
import {getBase, getPreview} from "./tools.tsx";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import {filesize} from 'filesize'

interface props {
    n:RestNode,
    setCurrent: (n:RestNode) => void,
    setSelection: (s:string) => void,
    selected: boolean,
    searchResult: boolean,
    showPreview?: boolean
    api: NodeServiceApi
}
const Node = (props:props)=> {

    const {n, setCurrent, selected, setSelection, searchResult, showPreview} = props;

    let isWorkspace
    let icon = n.Type == 'COLLECTION' ? '📂' : '📄'
    let previewImg;
    let hasTag = false;
    let ownerUUID:string = ''
    if(n.IsRecycleBin){
        icon = '🗑️'
    } else if (!searchResult && n.ContextWorkspace){
        icon = '🗂️'
        isWorkspace = true
    }
    const {preview, httpURL} = getPreview(n);
    if(showPreview && preview && httpURL) {
        previewImg= <img style={{width:20, maxHeight:20, marginRight: 10}} src={httpURL}/>
    }
    let metaStyle:React.CSSProperties = {marginLeft:10,opacity:0.5, fontSize:'0.8em'}
    if(searchResult) {
        metaStyle = {...metaStyle, opacity: 0.7, border: '1px solid', borderRadius: 5, padding: '2px 5px'}
    }
    if(n.UserMetadata) {
        hasTag = !!n.UserMetadata.find(m => m.Namespace === 'usermeta-tags');
        ownerUUID = n.UserMetadata.find(m => m.Namespace === 'usermeta-owner-uuid')?.JsonValue.replace(/"/g, '')||''
    }
    const origConversation = searchResult && n.ContextWorkspace && n.ContextWorkspace.Label

    return (
        <div
            style={{
                whiteSpace:'nowrap', cursor:'pointer',
                backgroundColor:selected?'rgba(255,255,255,0.2)':'transparent',
                padding:'2px '+ (isWorkspace ? '0' : '10px'),
                borderRadius:5,
                display:'flex',
                alignItems:'center'
            }}
            onClick={() => (n.Type == 'COLLECTION' ? setCurrent(n) : setSelection(n.Path))}
            onContextMenu={(e) => {e.preventDefault(); setSelection(n.Path)}}
        >
            {previewImg || icon} {getBase(n, searchResult)}

            {n.Modified && <span style={metaStyle}>{dayjs(parseInt(n.Modified)*1000).fromNow()}</span>}
            {n.Type === 'LEAF' && n.Size && <span style={metaStyle}>{filesize(parseInt(n.Size), {standard: "jedec"})}</span>}
            {origConversation && <span style={metaStyle}>{origConversation}</span>}
            {ownerUUID && <span style={metaStyle}>{ownerUUID}</span>}
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