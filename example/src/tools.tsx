import {RestNode, RestFilePreview} from "cells-sdk-ts";

export const getBase = (n:RestNode, searchResult=false):string => {
    if(n.IsRecycleBin) {
        return 'Recycle'
    } else if(n.ContextWorkspace && n.ContextWorkspace.Label && !searchResult) {
        return n.ContextWorkspace.Label;
    }
    const pp = n.Path!.split('/')
    if (!pp.length) {
        return n.Path||''
    }
    return pp.pop()||''
}

export const getPreview = (n: RestNode):{preview?: RestFilePreview|undefined, httpURL?: string} => {
    if(n.Previews && n.Previews.length > 0 && n.Previews[0].Key) {
        const previews = n.Previews.filter(p => p.ContentType !== 'application/pdf')
        if (previews.length) {
            const prev = previews.find(p => p.Dimension == 300) || previews[0]
            let url=''
            if (!!prev.PreSignedGET && !!prev.PreSignedGET.Url && prev.PreSignedGET.Url.startsWith("http")) {
                url = prev.PreSignedGET.Url;
            }
            return {
                preview: prev,
                httpURL: url
            }
        }
    }
    return {};
}
