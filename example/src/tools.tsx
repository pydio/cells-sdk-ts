import {RestNode} from "../../models";

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

export {getBase}