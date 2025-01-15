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

import { mapValues } from '../runtime';
import type { RestIncomingNode } from './RestIncomingNode';
import {
    RestIncomingNodeFromJSON,
    RestIncomingNodeFromJSONTyped,
    RestIncomingNodeToJSON,
    RestIncomingNodeToJSONTyped,
} from './RestIncomingNode';

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
    findAvailablePath?: boolean;
    /**
     * 
     * @type {Array<RestIncomingNode>}
     * @memberof RestCreateCheckRequest
     */
    inputs: Array<RestIncomingNode>;
}

/**
 * Check if a given object implements the RestCreateCheckRequest interface.
 */
export function instanceOfRestCreateCheckRequest(value: object): value is RestCreateCheckRequest {
    if (!('inputs' in value) || value['inputs'] === undefined) return false;
    return true;
}

export function RestCreateCheckRequestFromJSON(json: any): RestCreateCheckRequest {
    return RestCreateCheckRequestFromJSONTyped(json, false);
}

export function RestCreateCheckRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): RestCreateCheckRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'findAvailablePath': json['FindAvailablePath'] == null ? undefined : json['FindAvailablePath'],
        'inputs': ((json['Inputs'] as Array<any>).map(RestIncomingNodeFromJSON)),
    };
}

export function RestCreateCheckRequestToJSON(json: any): RestCreateCheckRequest {
    return RestCreateCheckRequestToJSONTyped(json, false);
}

export function RestCreateCheckRequestToJSONTyped(value?: RestCreateCheckRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'FindAvailablePath': value['findAvailablePath'],
        'Inputs': ((value['inputs'] as Array<any>).map(RestIncomingNodeToJSON)),
    };
}

