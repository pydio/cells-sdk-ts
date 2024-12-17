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
import type { RestNodeLocator } from './rest-node-locator';
// May contain unused imports in some cases
// @ts-ignore
import type { TreeNodeType } from './tree-node-type';

/**
 * 
 * @export
 * @interface RestIncomingNode
 */
export interface RestIncomingNode {
    /**
     * 
     * @type {string}
     * @memberof RestIncomingNode
     */
    'ContentType'?: string;
    /**
     * 
     * @type {RestNodeLocator}
     * @memberof RestIncomingNode
     */
    'Locator': RestNodeLocator;
    /**
     * 
     * @type {string}
     * @memberof RestIncomingNode
     */
    'TemplateUuid'?: string;
    /**
     * 
     * @type {TreeNodeType}
     * @memberof RestIncomingNode
     */
    'Type': TreeNodeType;
}



