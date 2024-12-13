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
import type { ServiceResourcePolicyQuery } from './ServiceResourcePolicyQuery';
import {
    ServiceResourcePolicyQueryFromJSON,
    ServiceResourcePolicyQueryFromJSONTyped,
    ServiceResourcePolicyQueryToJSON,
    ServiceResourcePolicyQueryToJSONTyped,
} from './ServiceResourcePolicyQuery';

/**
 * 
 * @export
 * @interface IdmSearchUserMetaRequest
 */
export interface IdmSearchUserMetaRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof IdmSearchUserMetaRequest
     */
    metaUuids?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof IdmSearchUserMetaRequest
     */
    namespace?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof IdmSearchUserMetaRequest
     */
    nodeUuids?: Array<string>;
    /**
     * 
     * @type {ServiceResourcePolicyQuery}
     * @memberof IdmSearchUserMetaRequest
     */
    resourceQuery?: ServiceResourcePolicyQuery;
    /**
     * 
     * @type {string}
     * @memberof IdmSearchUserMetaRequest
     */
    resourceSubjectOwner?: string;
}

/**
 * Check if a given object implements the IdmSearchUserMetaRequest interface.
 */
export function instanceOfIdmSearchUserMetaRequest(value: object): value is IdmSearchUserMetaRequest {
    return true;
}

export function IdmSearchUserMetaRequestFromJSON(json: any): IdmSearchUserMetaRequest {
    return IdmSearchUserMetaRequestFromJSONTyped(json, false);
}

export function IdmSearchUserMetaRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): IdmSearchUserMetaRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'metaUuids': json['MetaUuids'] == null ? undefined : json['MetaUuids'],
        'namespace': json['Namespace'] == null ? undefined : json['Namespace'],
        'nodeUuids': json['NodeUuids'] == null ? undefined : json['NodeUuids'],
        'resourceQuery': json['ResourceQuery'] == null ? undefined : ServiceResourcePolicyQueryFromJSON(json['ResourceQuery']),
        'resourceSubjectOwner': json['ResourceSubjectOwner'] == null ? undefined : json['ResourceSubjectOwner'],
    };
}

export function IdmSearchUserMetaRequestToJSON(json: any): IdmSearchUserMetaRequest {
    return IdmSearchUserMetaRequestToJSONTyped(json, false);
}

export function IdmSearchUserMetaRequestToJSONTyped(value?: IdmSearchUserMetaRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'MetaUuids': value['metaUuids'],
        'Namespace': value['namespace'],
        'NodeUuids': value['nodeUuids'],
        'ResourceQuery': ServiceResourcePolicyQueryToJSON(value['resourceQuery']),
        'ResourceSubjectOwner': value['resourceSubjectOwner'],
    };
}

