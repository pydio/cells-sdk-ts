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


/**
 * 
 * @export
 */
export const JobsDataSourceSelectorType = {
    DataSource: 'DataSource',
    Object: 'Object'
} as const;
export type JobsDataSourceSelectorType = typeof JobsDataSourceSelectorType[keyof typeof JobsDataSourceSelectorType];


export function instanceOfJobsDataSourceSelectorType(value: any): boolean {
    for (const key in JobsDataSourceSelectorType) {
        if (Object.prototype.hasOwnProperty.call(JobsDataSourceSelectorType, key)) {
            if (JobsDataSourceSelectorType[key as keyof typeof JobsDataSourceSelectorType] === value) {
                return true;
            }
        }
    }
    return false;
}

export function JobsDataSourceSelectorTypeFromJSON(json: any): JobsDataSourceSelectorType {
    return JobsDataSourceSelectorTypeFromJSONTyped(json, false);
}

export function JobsDataSourceSelectorTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): JobsDataSourceSelectorType {
    return json as JobsDataSourceSelectorType;
}

export function JobsDataSourceSelectorTypeToJSON(value?: JobsDataSourceSelectorType | null): any {
    return value as any;
}

export function JobsDataSourceSelectorTypeToJSONTyped(value: any, ignoreDiscriminator: boolean): JobsDataSourceSelectorType {
    return value as JobsDataSourceSelectorType;
}

