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
import type { ServiceQuery } from './ServiceQuery';
import {
    ServiceQueryFromJSON,
    ServiceQueryFromJSONTyped,
    ServiceQueryToJSON,
    ServiceQueryToJSONTyped,
} from './ServiceQuery';

/**
 * 
 * @export
 * @interface JobsActionOutputFilter
 */
export interface JobsActionOutputFilter {
    /**
     * 
     * @type {string}
     * @memberof JobsActionOutputFilter
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof JobsActionOutputFilter
     */
    label?: string;
    /**
     * 
     * @type {ServiceQuery}
     * @memberof JobsActionOutputFilter
     */
    query?: ServiceQuery;
}

/**
 * Check if a given object implements the JobsActionOutputFilter interface.
 */
export function instanceOfJobsActionOutputFilter(value: object): value is JobsActionOutputFilter {
    return true;
}

export function JobsActionOutputFilterFromJSON(json: any): JobsActionOutputFilter {
    return JobsActionOutputFilterFromJSONTyped(json, false);
}

export function JobsActionOutputFilterFromJSONTyped(json: any, ignoreDiscriminator: boolean): JobsActionOutputFilter {
    if (json == null) {
        return json;
    }
    return {
        
        'description': json['Description'] == null ? undefined : json['Description'],
        'label': json['Label'] == null ? undefined : json['Label'],
        'query': json['Query'] == null ? undefined : ServiceQueryFromJSON(json['Query']),
    };
}

export function JobsActionOutputFilterToJSON(json: any): JobsActionOutputFilter {
    return JobsActionOutputFilterToJSONTyped(json, false);
}

export function JobsActionOutputFilterToJSONTyped(value?: JobsActionOutputFilter | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'Description': value['description'],
        'Label': value['label'],
        'Query': ServiceQueryToJSON(value['query']),
    };
}

