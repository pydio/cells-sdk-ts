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
import type { ObjectEncryptionMode } from './ObjectEncryptionMode';
import {
    ObjectEncryptionModeFromJSON,
    ObjectEncryptionModeFromJSONTyped,
    ObjectEncryptionModeToJSON,
    ObjectEncryptionModeToJSONTyped,
} from './ObjectEncryptionMode';
import type { ObjectStorageType } from './ObjectStorageType';
import {
    ObjectStorageTypeFromJSON,
    ObjectStorageTypeFromJSONTyped,
    ObjectStorageTypeToJSON,
    ObjectStorageTypeToJSONTyped,
} from './ObjectStorageType';

/**
 * 
 * @export
 * @interface ObjectDataSource
 */
export interface ObjectDataSource {
    /**
     * 
     * @type {string}
     * @memberof ObjectDataSource
     */
    apiKey?: string;
    /**
     * 
     * @type {string}
     * @memberof ObjectDataSource
     */
    apiSecret?: string;
    /**
     * 
     * @type {number}
     * @memberof ObjectDataSource
     */
    creationDate?: number;
    /**
     * 
     * @type {boolean}
     * @memberof ObjectDataSource
     */
    disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ObjectDataSource
     */
    encryptionKey?: string;
    /**
     * 
     * @type {ObjectEncryptionMode}
     * @memberof ObjectDataSource
     */
    encryptionMode?: ObjectEncryptionMode;
    /**
     * 
     * @type {boolean}
     * @memberof ObjectDataSource
     */
    flatStorage?: boolean;
    /**
     * 
     * @type {number}
     * @memberof ObjectDataSource
     */
    lastSynchronizationDate?: number;
    /**
     * 
     * @type {string}
     * @memberof ObjectDataSource
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof ObjectDataSource
     */
    objectsBaseFolder?: string;
    /**
     * 
     * @type {string}
     * @memberof ObjectDataSource
     */
    objectsBucket?: string;
    /**
     * 
     * @type {string}
     * @memberof ObjectDataSource
     */
    objectsHost?: string;
    /**
     * 
     * @type {number}
     * @memberof ObjectDataSource
     */
    objectsPort?: number;
    /**
     * 
     * @type {boolean}
     * @memberof ObjectDataSource
     */
    objectsSecure?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ObjectDataSource
     */
    objectsServiceName?: string;
    /**
     * 
     * @type {string}
     * @memberof ObjectDataSource
     */
    peerAddress?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ObjectDataSource
     */
    skipSyncOnRestart?: boolean;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof ObjectDataSource
     */
    storageConfiguration?: { [key: string]: string; };
    /**
     * 
     * @type {ObjectStorageType}
     * @memberof ObjectDataSource
     */
    storageType?: ObjectStorageType;
    /**
     * 
     * @type {string}
     * @memberof ObjectDataSource
     */
    versioningPolicyName?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ObjectDataSource
     */
    watch?: boolean;
}



/**
 * Check if a given object implements the ObjectDataSource interface.
 */
export function instanceOfObjectDataSource(value: object): value is ObjectDataSource {
    return true;
}

export function ObjectDataSourceFromJSON(json: any): ObjectDataSource {
    return ObjectDataSourceFromJSONTyped(json, false);
}

export function ObjectDataSourceFromJSONTyped(json: any, ignoreDiscriminator: boolean): ObjectDataSource {
    if (json == null) {
        return json;
    }
    return {
        
        'apiKey': json['ApiKey'] == null ? undefined : json['ApiKey'],
        'apiSecret': json['ApiSecret'] == null ? undefined : json['ApiSecret'],
        'creationDate': json['CreationDate'] == null ? undefined : json['CreationDate'],
        'disabled': json['Disabled'] == null ? undefined : json['Disabled'],
        'encryptionKey': json['EncryptionKey'] == null ? undefined : json['EncryptionKey'],
        'encryptionMode': json['EncryptionMode'] == null ? undefined : ObjectEncryptionModeFromJSON(json['EncryptionMode']),
        'flatStorage': json['FlatStorage'] == null ? undefined : json['FlatStorage'],
        'lastSynchronizationDate': json['LastSynchronizationDate'] == null ? undefined : json['LastSynchronizationDate'],
        'name': json['Name'] == null ? undefined : json['Name'],
        'objectsBaseFolder': json['ObjectsBaseFolder'] == null ? undefined : json['ObjectsBaseFolder'],
        'objectsBucket': json['ObjectsBucket'] == null ? undefined : json['ObjectsBucket'],
        'objectsHost': json['ObjectsHost'] == null ? undefined : json['ObjectsHost'],
        'objectsPort': json['ObjectsPort'] == null ? undefined : json['ObjectsPort'],
        'objectsSecure': json['ObjectsSecure'] == null ? undefined : json['ObjectsSecure'],
        'objectsServiceName': json['ObjectsServiceName'] == null ? undefined : json['ObjectsServiceName'],
        'peerAddress': json['PeerAddress'] == null ? undefined : json['PeerAddress'],
        'skipSyncOnRestart': json['SkipSyncOnRestart'] == null ? undefined : json['SkipSyncOnRestart'],
        'storageConfiguration': json['StorageConfiguration'] == null ? undefined : json['StorageConfiguration'],
        'storageType': json['StorageType'] == null ? undefined : ObjectStorageTypeFromJSON(json['StorageType']),
        'versioningPolicyName': json['VersioningPolicyName'] == null ? undefined : json['VersioningPolicyName'],
        'watch': json['Watch'] == null ? undefined : json['Watch'],
    };
}

export function ObjectDataSourceToJSON(json: any): ObjectDataSource {
    return ObjectDataSourceToJSONTyped(json, false);
}

export function ObjectDataSourceToJSONTyped(value?: ObjectDataSource | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'ApiKey': value['apiKey'],
        'ApiSecret': value['apiSecret'],
        'CreationDate': value['creationDate'],
        'Disabled': value['disabled'],
        'EncryptionKey': value['encryptionKey'],
        'EncryptionMode': ObjectEncryptionModeToJSON(value['encryptionMode']),
        'FlatStorage': value['flatStorage'],
        'LastSynchronizationDate': value['lastSynchronizationDate'],
        'Name': value['name'],
        'ObjectsBaseFolder': value['objectsBaseFolder'],
        'ObjectsBucket': value['objectsBucket'],
        'ObjectsHost': value['objectsHost'],
        'ObjectsPort': value['objectsPort'],
        'ObjectsSecure': value['objectsSecure'],
        'ObjectsServiceName': value['objectsServiceName'],
        'PeerAddress': value['peerAddress'],
        'SkipSyncOnRestart': value['skipSyncOnRestart'],
        'StorageConfiguration': value['storageConfiguration'],
        'StorageType': ObjectStorageTypeToJSON(value['storageType']),
        'VersioningPolicyName': value['versioningPolicyName'],
        'Watch': value['watch'],
    };
}
