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
import type { RestVersionsTypes } from './rest-versions-types';
/**
 *
 * @export
 * @interface RestNodeVersionsFilter
 */
export interface RestNodeVersionsFilter {
    /**
     *
     * @type {RestVersionsTypes}
     * @memberof RestNodeVersionsFilter
     */
    'FilterBy'?: RestVersionsTypes;
    /**
     *
     * @type {string}
     * @memberof RestNodeVersionsFilter
     */
    'Limit'?: string;
    /**
     *
     * @type {string}
     * @memberof RestNodeVersionsFilter
     */
    'Offset'?: string;
    /**
     *
     * @type {boolean}
     * @memberof RestNodeVersionsFilter
     */
    'SortDirDesc'?: boolean;
    /**
     *
     * @type {string}
     * @memberof RestNodeVersionsFilter
     */
    'SortField'?: string;
}
