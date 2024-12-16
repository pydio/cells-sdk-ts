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
 * @interface RestPagination
 */
export interface RestPagination {
    /**
     * 
     * @type {number}
     * @memberof RestPagination
     */
    currentOffset?: number;
    /**
     * 
     * @type {number}
     * @memberof RestPagination
     */
    currentPage?: number;
    /**
     * 
     * @type {number}
     * @memberof RestPagination
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof RestPagination
     */
    nextOffset?: number;
    /**
     * 
     * @type {number}
     * @memberof RestPagination
     */
    prevOffset?: number;
    /**
     * 
     * @type {number}
     * @memberof RestPagination
     */
    total?: number;
    /**
     * 
     * @type {number}
     * @memberof RestPagination
     */
    totalPages?: number;
}

/**
 * Check if a given object implements the RestPagination interface.
 */
export function instanceOfRestPagination(value: object): value is RestPagination {
    return true;
}

export function RestPaginationFromJSON(json: any): RestPagination {
    return RestPaginationFromJSONTyped(json, false);
}

export function RestPaginationFromJSONTyped(json: any, ignoreDiscriminator: boolean): RestPagination {
    if (json == null) {
        return json;
    }
    return {
        
        'currentOffset': json['CurrentOffset'] == null ? undefined : json['CurrentOffset'],
        'currentPage': json['CurrentPage'] == null ? undefined : json['CurrentPage'],
        'limit': json['Limit'] == null ? undefined : json['Limit'],
        'nextOffset': json['NextOffset'] == null ? undefined : json['NextOffset'],
        'prevOffset': json['PrevOffset'] == null ? undefined : json['PrevOffset'],
        'total': json['Total'] == null ? undefined : json['Total'],
        'totalPages': json['TotalPages'] == null ? undefined : json['TotalPages'],
    };
}

export function RestPaginationToJSON(json: any): RestPagination {
    return RestPaginationToJSONTyped(json, false);
}

export function RestPaginationToJSONTyped(value?: RestPagination | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'CurrentOffset': value['currentOffset'],
        'CurrentPage': value['currentPage'],
        'Limit': value['limit'],
        'NextOffset': value['nextOffset'],
        'PrevOffset': value['prevOffset'],
        'Total': value['total'],
        'TotalPages': value['totalPages'],
    };
}
