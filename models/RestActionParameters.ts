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
import type { RestNodeLocator } from './RestNodeLocator';
import {
    RestNodeLocatorFromJSON,
    RestNodeLocatorFromJSONTyped,
    RestNodeLocatorToJSON,
    RestNodeLocatorToJSONTyped,
} from './RestNodeLocator';
import type { JobsTaskStatus } from './JobsTaskStatus';
import {
    JobsTaskStatusFromJSON,
    JobsTaskStatusFromJSONTyped,
    JobsTaskStatusToJSON,
    JobsTaskStatusToJSONTyped,
} from './JobsTaskStatus';

/**
 * 
 * @export
 * @interface RestActionParameters
 */
export interface RestActionParameters {
    /**
     * 
     * @type {JobsTaskStatus}
     * @memberof RestActionParameters
     */
    awaitStatus?: JobsTaskStatus;
    /**
     * 
     * @type {string}
     * @memberof RestActionParameters
     */
    awaitTimeout?: string;
    /**
     * 
     * @type {string}
     * @memberof RestActionParameters
     */
    jsonParameters?: string;
    /**
     * 
     * @type {Array<RestNodeLocator>}
     * @memberof RestActionParameters
     */
    nodes?: Array<RestNodeLocator>;
    /**
     * 
     * @type {string}
     * @memberof RestActionParameters
     */
    selectionUuid?: string;
    /**
     * 
     * @type {RestNodeLocator}
     * @memberof RestActionParameters
     */
    targetNode?: RestNodeLocator;
}



/**
 * Check if a given object implements the RestActionParameters interface.
 */
export function instanceOfRestActionParameters(value: object): value is RestActionParameters {
    return true;
}

export function RestActionParametersFromJSON(json: any): RestActionParameters {
    return RestActionParametersFromJSONTyped(json, false);
}

export function RestActionParametersFromJSONTyped(json: any, ignoreDiscriminator: boolean): RestActionParameters {
    if (json == null) {
        return json;
    }
    return {
        
        'awaitStatus': json['AwaitStatus'] == null ? undefined : JobsTaskStatusFromJSON(json['AwaitStatus']),
        'awaitTimeout': json['AwaitTimeout'] == null ? undefined : json['AwaitTimeout'],
        'jsonParameters': json['JsonParameters'] == null ? undefined : json['JsonParameters'],
        'nodes': json['Nodes'] == null ? undefined : ((json['Nodes'] as Array<any>).map(RestNodeLocatorFromJSON)),
        'selectionUuid': json['SelectionUuid'] == null ? undefined : json['SelectionUuid'],
        'targetNode': json['TargetNode'] == null ? undefined : RestNodeLocatorFromJSON(json['TargetNode']),
    };
}

export function RestActionParametersToJSON(json: any): RestActionParameters {
    return RestActionParametersToJSONTyped(json, false);
}

export function RestActionParametersToJSONTyped(value?: RestActionParameters | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'AwaitStatus': JobsTaskStatusToJSON(value['awaitStatus']),
        'AwaitTimeout': value['awaitTimeout'],
        'JsonParameters': value['jsonParameters'],
        'Nodes': value['nodes'] == null ? undefined : ((value['nodes'] as Array<any>).map(RestNodeLocatorToJSON)),
        'SelectionUuid': value['selectionUuid'],
        'TargetNode': RestNodeLocatorToJSON(value['targetNode']),
    };
}

