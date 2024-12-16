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
export const RestNsOp = {
    Put: 'PUT',
    Delete: 'DELETE'
} as const;
export type RestNsOp = typeof RestNsOp[keyof typeof RestNsOp];


export function instanceOfRestNsOp(value: any): boolean {
    for (const key in RestNsOp) {
        if (Object.prototype.hasOwnProperty.call(RestNsOp, key)) {
            if (RestNsOp[key as keyof typeof RestNsOp] === value) {
                return true;
            }
        }
    }
    return false;
}

export function RestNsOpFromJSON(json: any): RestNsOp {
    return RestNsOpFromJSONTyped(json, false);
}

export function RestNsOpFromJSONTyped(json: any, ignoreDiscriminator: boolean): RestNsOp {
    return json as RestNsOp;
}

export function RestNsOpToJSON(value?: RestNsOp | null): any {
    return value as any;
}

export function RestNsOpToJSONTyped(value: any, ignoreDiscriminator: boolean): RestNsOp {
    return value as RestNsOp;
}
