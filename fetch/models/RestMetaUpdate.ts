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
import type { MetaUpdateOp } from './MetaUpdateOp';
import {
    MetaUpdateOpFromJSON,
    MetaUpdateOpFromJSONTyped,
    MetaUpdateOpToJSON,
    MetaUpdateOpToJSONTyped,
} from './MetaUpdateOp';
import type { RestUserMeta } from './RestUserMeta';
import {
    RestUserMetaFromJSON,
    RestUserMetaFromJSONTyped,
    RestUserMetaToJSON,
    RestUserMetaToJSONTyped,
} from './RestUserMeta';

/**
 * 
 * @export
 * @interface RestMetaUpdate
 */
export interface RestMetaUpdate {
    /**
     * 
     * @type {MetaUpdateOp}
     * @memberof RestMetaUpdate
     */
    operation?: MetaUpdateOp;
    /**
     * 
     * @type {RestUserMeta}
     * @memberof RestMetaUpdate
     */
    userMeta?: RestUserMeta;
}



/**
 * Check if a given object implements the RestMetaUpdate interface.
 */
export function instanceOfRestMetaUpdate(value: object): value is RestMetaUpdate {
    return true;
}

export function RestMetaUpdateFromJSON(json: any): RestMetaUpdate {
    return RestMetaUpdateFromJSONTyped(json, false);
}

export function RestMetaUpdateFromJSONTyped(json: any, ignoreDiscriminator: boolean): RestMetaUpdate {
    if (json == null) {
        return json;
    }
    return {
        
        'operation': json['Operation'] == null ? undefined : MetaUpdateOpFromJSON(json['Operation']),
        'userMeta': json['UserMeta'] == null ? undefined : RestUserMetaFromJSON(json['UserMeta']),
    };
}

export function RestMetaUpdateToJSON(json: any): RestMetaUpdate {
    return RestMetaUpdateToJSONTyped(json, false);
}

export function RestMetaUpdateToJSONTyped(value?: RestMetaUpdate | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'Operation': MetaUpdateOpToJSON(value['operation']),
        'UserMeta': RestUserMetaToJSON(value['userMeta']),
    };
}
