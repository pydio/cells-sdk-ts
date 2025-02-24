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
import type { RestActionStatus } from './rest-action-status';
import type { RestBackgroundAction } from './rest-background-action';
import type { RestNode } from './rest-node';
/**
 *
 * @export
 * @interface RestPerformActionResponse
 */
export interface RestPerformActionResponse {
    /**
     *
     * @type {Array<RestNode>}
     * @memberof RestPerformActionResponse
     */
    'AffectedNodes'?: Array<RestNode>;
    /**
     *
     * @type {Array<RestBackgroundAction>}
     * @memberof RestPerformActionResponse
     */
    'BackgroundActions'?: Array<RestBackgroundAction>;
    /**
     *
     * @type {RestActionStatus}
     * @memberof RestPerformActionResponse
     */
    'Status'?: RestActionStatus;
}
