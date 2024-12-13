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
 * @interface JobsActionOutput
 */
export interface JobsActionOutput {
    /**
     * 
     * @type {string}
     * @memberof JobsActionOutput
     */
    errorString?: string;
    /**
     * 
     * @type {boolean}
     * @memberof JobsActionOutput
     */
    ignored?: boolean;
    /**
     * 
     * @type {string}
     * @memberof JobsActionOutput
     */
    jsonBody?: string;
    /**
     * 
     * @type {string}
     * @memberof JobsActionOutput
     */
    rawBody?: string;
    /**
     * 
     * @type {string}
     * @memberof JobsActionOutput
     */
    stringBody?: string;
    /**
     * 
     * @type {boolean}
     * @memberof JobsActionOutput
     */
    success?: boolean;
    /**
     * 
     * @type {number}
     * @memberof JobsActionOutput
     */
    time?: number;
    /**
     * Vars container, values are json-encoded.
     * @type {{ [key: string]: string; }}
     * @memberof JobsActionOutput
     */
    vars?: { [key: string]: string; };
}

/**
 * Check if a given object implements the JobsActionOutput interface.
 */
export function instanceOfJobsActionOutput(value: object): value is JobsActionOutput {
    return true;
}

export function JobsActionOutputFromJSON(json: any): JobsActionOutput {
    return JobsActionOutputFromJSONTyped(json, false);
}

export function JobsActionOutputFromJSONTyped(json: any, ignoreDiscriminator: boolean): JobsActionOutput {
    if (json == null) {
        return json;
    }
    return {
        
        'errorString': json['ErrorString'] == null ? undefined : json['ErrorString'],
        'ignored': json['Ignored'] == null ? undefined : json['Ignored'],
        'jsonBody': json['JsonBody'] == null ? undefined : json['JsonBody'],
        'rawBody': json['RawBody'] == null ? undefined : json['RawBody'],
        'stringBody': json['StringBody'] == null ? undefined : json['StringBody'],
        'success': json['Success'] == null ? undefined : json['Success'],
        'time': json['Time'] == null ? undefined : json['Time'],
        'vars': json['Vars'] == null ? undefined : json['Vars'],
    };
}

export function JobsActionOutputToJSON(json: any): JobsActionOutput {
    return JobsActionOutputToJSONTyped(json, false);
}

export function JobsActionOutputToJSONTyped(value?: JobsActionOutput | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'ErrorString': value['errorString'],
        'Ignored': value['ignored'],
        'JsonBody': value['jsonBody'],
        'RawBody': value['rawBody'],
        'StringBody': value['stringBody'],
        'Success': value['success'],
        'Time': value['time'],
        'Vars': value['vars'],
    };
}

