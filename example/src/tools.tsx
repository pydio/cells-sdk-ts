import {RestNode} from "cells-sdk-ts";

const getBase = (n:RestNode):string => {
    if(n.IsRecycleBin) {
        return 'Recycle'
    } else if(n.ContextWorkspace && n.ContextWorkspace.Label) {
        return n.ContextWorkspace.Label;
    }
    const pp = n.Path!.split('/')
    if (!pp.length) {
        return n.Path||''
    }
    return pp.pop()||''
}

export {getBase}