/* tslint:disable */
/* eslint-disable */
/**
 * Pydio Cells Rest API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 
 * @export
 */
export const MetaUpdateOp = {
    Put: 'PUT',
    Delete: 'DELETE'
} as const;
export type MetaUpdateOp = typeof MetaUpdateOp[keyof typeof MetaUpdateOp];


export function instanceOfMetaUpdateOp(value: any): boolean {
    for (const key in MetaUpdateOp) {
        if (Object.prototype.hasOwnProperty.call(MetaUpdateOp, key)) {
            if (MetaUpdateOp[key as keyof typeof MetaUpdateOp] === value) {
                return true;
            }
        }
    }
    return false;
}

export function MetaUpdateOpFromJSON(json: any): MetaUpdateOp {
    return MetaUpdateOpFromJSONTyped(json, false);
}

export function MetaUpdateOpFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetaUpdateOp {
    return json as MetaUpdateOp;
}

export function MetaUpdateOpToJSON(value?: MetaUpdateOp | null): any {
    return value as any;
}

export function MetaUpdateOpToJSONTyped(value: any, ignoreDiscriminator: boolean): MetaUpdateOp {
    return value as MetaUpdateOp;
}

