import {NodeServiceApi, RestNode} from "../../index.ts";

interface props {
    n:RestNode,
    setCurrent:any,
    setSelection: any,
    selected: boolean,
    api: NodeServiceApi
}
const Node = (props:props)=> {

    const getBase = (n:RestNode):string => {
        if(n.isRecycleBin) {
            return 'Recycle'
        } else if(n.contextWorkspace && n.contextWorkspace.label) {
            return n.contextWorkspace.label;
        }
        const pp = n.path!.split('/')
        if (!pp.length) {
            return n.path||''
        }
        return pp.pop()||''
    }


    const {n, setCurrent, selected, setSelection} = props;

    let icon = n.type == 'COLLECTION' ? '📂' : '📄'
    if(n.isRecycleBin){
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
            onClick={() => (n.type == 'COLLECTION' ? setCurrent(n) : setSelection(n.path))}
            onContextMenu={(e) => {e.preventDefault(); setSelection(n.path)}}
        >
            {icon} {getBase(n)}
            {n.isBookmarked && ' ⭐'}
            {n.subscriptions && ' 🔔'}
            {n.userMetadata && ' 🏷️'}
            {n.contentLock && ' 🔒'}
            {n.shares && ' 🔗'}
        </div>
    )

}

export default Node;