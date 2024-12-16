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
/**
 * 
 * @export
 * @interface RestPublicLinkDeleteSuccess
 */
export interface RestPublicLinkDeleteSuccess {
    /**
     * 
     * @type {string}
     * @memberof RestPublicLinkDeleteSuccess
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof RestPublicLinkDeleteSuccess
     */
    uuid?: string;
}

/**
 * Check if a given object implements the RestPublicLinkDeleteSuccess interface.
 */
export function instanceOfRestPublicLinkDeleteSuccess(value: object): value is RestPublicLinkDeleteSuccess {
    return true;
}

export function RestPublicLinkDeleteSuccessFromJSON(json: any): RestPublicLinkDeleteSuccess {
    return RestPublicLinkDeleteSuccessFromJSONTyped(json, false);
}

export function RestPublicLinkDeleteSuccessFromJSONTyped(json: any, ignoreDiscriminator: boolean): RestPublicLinkDeleteSuccess {
    if (json == null) {
        return json;
    }
    return {
        
        'message': json['Message'] == null ? undefined : json['Message'],
        'uuid': json['Uuid'] == null ? undefined : json['Uuid'],
    };
}

export function RestPublicLinkDeleteSuccessToJSON(json: any): RestPublicLinkDeleteSuccess {
    return RestPublicLinkDeleteSuccessToJSONTyped(json, false);
}

export function RestPublicLinkDeleteSuccessToJSONTyped(value?: RestPublicLinkDeleteSuccess | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'Message': value['message'],
        'Uuid': value['uuid'],
    };
}
