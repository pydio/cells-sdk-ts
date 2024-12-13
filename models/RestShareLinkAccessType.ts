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
export const RestShareLinkAccessType = {
    NoAccess: 'NoAccess',
    Preview: 'Preview',
    Download: 'Download',
    Upload: 'Upload'
} as const;
export type RestShareLinkAccessType = typeof RestShareLinkAccessType[keyof typeof RestShareLinkAccessType];


export function instanceOfRestShareLinkAccessType(value: any): boolean {
    for (const key in RestShareLinkAccessType) {
        if (Object.prototype.hasOwnProperty.call(RestShareLinkAccessType, key)) {
            if (RestShareLinkAccessType[key as keyof typeof RestShareLinkAccessType] === value) {
                return true;
            }
        }
    }
    return false;
}

export function RestShareLinkAccessTypeFromJSON(json: any): RestShareLinkAccessType {
    return RestShareLinkAccessTypeFromJSONTyped(json, false);
}

export function RestShareLinkAccessTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): RestShareLinkAccessType {
    return json as RestShareLinkAccessType;
}

export function RestShareLinkAccessTypeToJSON(value?: RestShareLinkAccessType | null): any {
    return value as any;
}

export function RestShareLinkAccessTypeToJSONTyped(value: any, ignoreDiscriminator: boolean): RestShareLinkAccessType {
    return value as RestShareLinkAccessType;
}

