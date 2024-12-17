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


// May contain unused imports in some cases
// @ts-ignore
import type { RestNodeLocators } from './rest-node-locators';
// May contain unused imports in some cases
// @ts-ignore
import type { TreeQuery } from './tree-query';

/**
 * 
 * @export
 * @interface RestLookupRequest
 */
export interface RestLookupRequest {
    /**
     * 
     * @type {string}
     * @memberof RestLookupRequest
     */
    'Limit'?: string;
    /**
     * 
     * @type {RestNodeLocators}
     * @memberof RestLookupRequest
     */
    'Locators'?: RestNodeLocators;
    /**
     * 
     * @type {string}
     * @memberof RestLookupRequest
     */
    'Offset'?: string;
    /**
     * 
     * @type {TreeQuery}
     * @memberof RestLookupRequest
     */
    'Query'?: TreeQuery;
    /**
     * 
     * @type {boolean}
     * @memberof RestLookupRequest
     */
    'SortDirDesc'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof RestLookupRequest
     */
    'SortField'?: string;
    /**
     * 
     * @type {Array<number>}
     * @memberof RestLookupRequest
     */
    'StatFlags'?: Array<number>;
}
