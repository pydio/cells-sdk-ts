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
 * @enum {string}
 */

export const RestShareLinkAccessType = {
    NoAccess: 'NoAccess',
    Preview: 'Preview',
    Download: 'Download',
    Upload: 'Upload'
} as const;

export type RestShareLinkAccessType = typeof RestShareLinkAccessType[keyof typeof RestShareLinkAccessType];



