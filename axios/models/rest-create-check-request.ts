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


// May contain unused imports in some cases
// @ts-ignore
import type { RestIncomingNode } from './rest-incoming-node';

/**
 * Request for pre-checking nodes before uploading or creating them.
 * @export
 * @interface RestCreateCheckRequest
 */
export interface RestCreateCheckRequest {
    /**
     * 
     * @type {boolean}
     * @memberof RestCreateCheckRequest
     */
    'FindAvailablePath'?: boolean;
    /**
     * 
     * @type {Array<RestIncomingNode>}
     * @memberof RestCreateCheckRequest
     */
    'Inputs': Array<RestIncomingNode>;
}

