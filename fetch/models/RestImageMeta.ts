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
 * @interface RestImageMeta
 */
export interface RestImageMeta {
    /**
     * 
     * @type {number}
     * @memberof RestImageMeta
     */
    height?: number;
    /**
     * 
     * @type {string}
     * @memberof RestImageMeta
     */
    jsonEXIF?: string;
    /**
     * 
     * @type {number}
     * @memberof RestImageMeta
     */
    orientation?: number;
    /**
     * 
     * @type {number}
     * @memberof RestImageMeta
     */
    width?: number;
}

/**
 * Check if a given object implements the RestImageMeta interface.
 */
export function instanceOfRestImageMeta(value: object): value is RestImageMeta {
    return true;
}

export function RestImageMetaFromJSON(json: any): RestImageMeta {
    return RestImageMetaFromJSONTyped(json, false);
}

export function RestImageMetaFromJSONTyped(json: any, ignoreDiscriminator: boolean): RestImageMeta {
    if (json == null) {
        return json;
    }
    return {
        
        'height': json['Height'] == null ? undefined : json['Height'],
        'jsonEXIF': json['JsonEXIF'] == null ? undefined : json['JsonEXIF'],
        'orientation': json['Orientation'] == null ? undefined : json['Orientation'],
        'width': json['Width'] == null ? undefined : json['Width'],
    };
}

export function RestImageMetaToJSON(json: any): RestImageMeta {
    return RestImageMetaToJSONTyped(json, false);
}

export function RestImageMetaToJSONTyped(value?: RestImageMeta | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'Height': value['height'],
        'JsonEXIF': value['jsonEXIF'],
        'Orientation': value['orientation'],
        'Width': value['width'],
    };
}
