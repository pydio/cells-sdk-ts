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
import type { IdmUser } from './IdmUser';
import {
    IdmUserFromJSON,
    IdmUserFromJSONTyped,
    IdmUserToJSON,
    IdmUserToJSONTyped,
} from './IdmUser';
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
 * @interface JobsUsersSelector
 */
export interface JobsUsersSelector {
    /**
     * 
     * @type {boolean}
     * @memberof JobsUsersSelector
     */
    all?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof JobsUsersSelector
     */
    clearInput?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof JobsUsersSelector
     */
    collect?: boolean;
    /**
     * 
     * @type {string}
     * @memberof JobsUsersSelector
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof JobsUsersSelector
     */
    label?: string;
    /**
     * 
     * @type {ServiceQuery}
     * @memberof JobsUsersSelector
     */
    query?: ServiceQuery;
    /**
     * 
     * @type {string}
     * @memberof JobsUsersSelector
     */
    timeout?: string;
    /**
     * 
     * @type {Array<IdmUser>}
     * @memberof JobsUsersSelector
     */
    users?: Array<IdmUser>;
}

/**
 * Check if a given object implements the JobsUsersSelector interface.
 */
export function instanceOfJobsUsersSelector(value: object): value is JobsUsersSelector {
    return true;
}

export function JobsUsersSelectorFromJSON(json: any): JobsUsersSelector {
    return JobsUsersSelectorFromJSONTyped(json, false);
}

export function JobsUsersSelectorFromJSONTyped(json: any, ignoreDiscriminator: boolean): JobsUsersSelector {
    if (json == null) {
        return json;
    }
    return {
        
        'all': json['All'] == null ? undefined : json['All'],
        'clearInput': json['ClearInput'] == null ? undefined : json['ClearInput'],
        'collect': json['Collect'] == null ? undefined : json['Collect'],
        'description': json['Description'] == null ? undefined : json['Description'],
        'label': json['Label'] == null ? undefined : json['Label'],
        'query': json['Query'] == null ? undefined : ServiceQueryFromJSON(json['Query']),
        'timeout': json['Timeout'] == null ? undefined : json['Timeout'],
        'users': json['Users'] == null ? undefined : ((json['Users'] as Array<any>).map(IdmUserFromJSON)),
    };
}

export function JobsUsersSelectorToJSON(json: any): JobsUsersSelector {
    return JobsUsersSelectorToJSONTyped(json, false);
}

export function JobsUsersSelectorToJSONTyped(value?: JobsUsersSelector | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'All': value['all'],
        'ClearInput': value['clearInput'],
        'Collect': value['collect'],
        'Description': value['description'],
        'Label': value['label'],
        'Query': ServiceQueryToJSON(value['query']),
        'Timeout': value['timeout'],
        'Users': value['users'] == null ? undefined : ((value['users'] as Array<any>).map(IdmUserToJSON)),
    };
}
