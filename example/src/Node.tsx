import {NodeServiceApi, RestNode} from "../../axios";
import {getBase} from "./tools.tsx";

interface props {
    n:RestNode,
    setCurrent:any,
    setSelection: any,
    selected: boolean,
    api: NodeServiceApi
}
const Node = (props:props)=> {

    const {n, setCurrent, selected, setSelection} = props;

    let icon = n.Type == 'COLLECTION' ? '📂' : '📄'
    if(n.IsRecycleBin){
        icon = '🗑️'
    }

    return (
        <div
            style={{
                whiteSpace:'nowrap', cursor:'pointer',
                backgroundColor:selected?'rgba(255,255,255,0.2)':'transparent',
                padding:'2px 10px',
                borderRadius:5
            }}
            onClick={() => (n.Type == 'COLLECTION' ? setCurrent(n) : setSelection(n.Path))}
            onContextMenu={(e) => {e.preventDefault(); setSelection(n.Path)}}
        >
            {icon} {getBase(n)}
            {n.IsBookmarked && ' ⭐'}
            {n.Subscriptions && ' 🔔'}
            {n.UserMetadata && ' 🏷️'}
            {n.ContentLock && ' 🔒'}
            {n.Shares && ' 🔗'}
        </div>
    )

}

export default Node;