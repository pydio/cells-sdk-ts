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
import type { RestNode } from './rest-node';
// May contain unused imports in some cases
// @ts-ignore
import type { RestPublishCascadeResult } from './rest-publish-cascade-result';

/**
 * 
 * @export
 * @interface RestPublishNodeResponse
 */
export interface RestPublishNodeResponse {
    /**
     * 
     * @type {Array<RestPublishCascadeResult>}
     * @memberof RestPublishNodeResponse
     */
    'CascadeResults'?: Array<RestPublishCascadeResult>;
    /**
     * 
     * @type {RestNode}
     * @memberof RestPublishNodeResponse
     */
    'Node'?: RestNode;
}

