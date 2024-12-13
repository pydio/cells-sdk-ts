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
import type { TreeNodeChangeEvent } from './TreeNodeChangeEvent';
import {
    TreeNodeChangeEventFromJSON,
    TreeNodeChangeEventFromJSONTyped,
    TreeNodeChangeEventToJSON,
    TreeNodeChangeEventToJSONTyped,
} from './TreeNodeChangeEvent';
import type { TreeNode } from './TreeNode';
import {
    TreeNodeFromJSON,
    TreeNodeFromJSONTyped,
    TreeNodeToJSON,
    TreeNodeToJSONTyped,
} from './TreeNode';

/**
 * 
 * @export
 * @interface TreeChangeLog
 */
export interface TreeChangeLog {
    /**
     * 
     * @type {string}
     * @memberof TreeChangeLog
     */
    data?: string;
    /**
     * 
     * @type {string}
     * @memberof TreeChangeLog
     */
    description?: string;
    /**
     * 
     * @type {TreeNodeChangeEvent}
     * @memberof TreeChangeLog
     */
    event?: TreeNodeChangeEvent;
    /**
     * 
     * @type {TreeNode}
     * @memberof TreeChangeLog
     */
    location?: TreeNode;
    /**
     * 
     * @type {string}
     * @memberof TreeChangeLog
     */
    mTime?: string;
    /**
     * 
     * @type {string}
     * @memberof TreeChangeLog
     */
    ownerUuid?: string;
    /**
     * 
     * @type {string}
     * @memberof TreeChangeLog
     */
    size?: string;
    /**
     * 
     * @type {string}
     * @memberof TreeChangeLog
     */
    uuid?: string;
}

/**
 * Check if a given object implements the TreeChangeLog interface.
 */
export function instanceOfTreeChangeLog(value: object): value is TreeChangeLog {
    return true;
}

export function TreeChangeLogFromJSON(json: any): TreeChangeLog {
    return TreeChangeLogFromJSONTyped(json, false);
}

export function TreeChangeLogFromJSONTyped(json: any, ignoreDiscriminator: boolean): TreeChangeLog {
    if (json == null) {
        return json;
    }
    return {
        
        'data': json['Data'] == null ? undefined : json['Data'],
        'description': json['Description'] == null ? undefined : json['Description'],
        'event': json['Event'] == null ? undefined : TreeNodeChangeEventFromJSON(json['Event']),
        'location': json['Location'] == null ? undefined : TreeNodeFromJSON(json['Location']),
        'mTime': json['MTime'] == null ? undefined : json['MTime'],
        'ownerUuid': json['OwnerUuid'] == null ? undefined : json['OwnerUuid'],
        'size': json['Size'] == null ? undefined : json['Size'],
        'uuid': json['Uuid'] == null ? undefined : json['Uuid'],
    };
}

export function TreeChangeLogToJSON(json: any): TreeChangeLog {
    return TreeChangeLogToJSONTyped(json, false);
}

export function TreeChangeLogToJSONTyped(value?: TreeChangeLog | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'Data': value['data'],
        'Description': value['description'],
        'Event': TreeNodeChangeEventToJSON(value['event']),
        'Location': TreeNodeToJSON(value['location']),
        'MTime': value['mTime'],
        'OwnerUuid': value['ownerUuid'],
        'Size': value['size'],
        'Uuid': value['uuid'],
    };
}

