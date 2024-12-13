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
import type { JobsSelectorRange } from './JobsSelectorRange';
import {
    JobsSelectorRangeFromJSON,
    JobsSelectorRangeFromJSONTyped,
    JobsSelectorRangeToJSON,
    JobsSelectorRangeToJSONTyped,
} from './JobsSelectorRange';
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
 * @interface JobsNodesSelector
 */
export interface JobsNodesSelector {
    /**
     * 
     * @type {boolean}
     * @memberof JobsNodesSelector
     */
    all?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof JobsNodesSelector
     */
    clearInput?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof JobsNodesSelector
     */
    collect?: boolean;
    /**
     * 
     * @type {string}
     * @memberof JobsNodesSelector
     */
    description?: string;
    /**
     * 
     * @type {boolean}
     * @memberof JobsNodesSelector
     */
    fanOutInput?: boolean;
    /**
     * 
     * @type {string}
     * @memberof JobsNodesSelector
     */
    label?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof JobsNodesSelector
     */
    pathes?: Array<string>;
    /**
     * 
     * @type {ServiceQuery}
     * @memberof JobsNodesSelector
     */
    query?: ServiceQuery;
    /**
     * 
     * @type {JobsSelectorRange}
     * @memberof JobsNodesSelector
     */
    range?: JobsSelectorRange;
    /**
     * 
     * @type {string}
     * @memberof JobsNodesSelector
     */
    timeout?: string;
}

/**
 * Check if a given object implements the JobsNodesSelector interface.
 */
export function instanceOfJobsNodesSelector(value: object): value is JobsNodesSelector {
    return true;
}

export function JobsNodesSelectorFromJSON(json: any): JobsNodesSelector {
    return JobsNodesSelectorFromJSONTyped(json, false);
}

export function JobsNodesSelectorFromJSONTyped(json: any, ignoreDiscriminator: boolean): JobsNodesSelector {
    if (json == null) {
        return json;
    }
    return {
        
        'all': json['All'] == null ? undefined : json['All'],
        'clearInput': json['ClearInput'] == null ? undefined : json['ClearInput'],
        'collect': json['Collect'] == null ? undefined : json['Collect'],
        'description': json['Description'] == null ? undefined : json['Description'],
        'fanOutInput': json['FanOutInput'] == null ? undefined : json['FanOutInput'],
        'label': json['Label'] == null ? undefined : json['Label'],
        'pathes': json['Pathes'] == null ? undefined : json['Pathes'],
        'query': json['Query'] == null ? undefined : ServiceQueryFromJSON(json['Query']),
        'range': json['Range'] == null ? undefined : JobsSelectorRangeFromJSON(json['Range']),
        'timeout': json['Timeout'] == null ? undefined : json['Timeout'],
    };
}

export function JobsNodesSelectorToJSON(json: any): JobsNodesSelector {
    return JobsNodesSelectorToJSONTyped(json, false);
}

export function JobsNodesSelectorToJSONTyped(value?: JobsNodesSelector | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'All': value['all'],
        'ClearInput': value['clearInput'],
        'Collect': value['collect'],
        'Description': value['description'],
        'FanOutInput': value['fanOutInput'],
        'Label': value['label'],
        'Pathes': value['pathes'],
        'Query': ServiceQueryToJSON(value['query']),
        'Range': JobsSelectorRangeToJSON(value['range']),
        'Timeout': value['timeout'],
    };
}
