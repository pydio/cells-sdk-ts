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
import type { TreeGeoPoint } from './tree-geo-point';

/**
 * 
 * @export
 * @interface TreeGeoQuery
 */
export interface TreeGeoQuery {
    /**
     * 
     * @type {TreeGeoPoint}
     * @memberof TreeGeoQuery
     */
    'BottomRight'?: TreeGeoPoint;
    /**
     * 
     * @type {TreeGeoPoint}
     * @memberof TreeGeoQuery
     */
    'Center'?: TreeGeoPoint;
    /**
     * Example formats supported: \"5in\" \"5inch\" \"7yd\" \"7yards\" \"9ft\" \"9feet\" \"11km\" \"11kilometers\" \"3nm\" \"3nauticalmiles\" \"13mm\" \"13millimeters\" \"15cm\" \"15centimeters\" \"17mi\" \"17miles\" \"19m\" \"19meters\" If the unit cannot be determined, the entire string is parsed and the unit of meters is assumed.
     * @type {string}
     * @memberof TreeGeoQuery
     */
    'Distance'?: string;
    /**
     * 
     * @type {TreeGeoPoint}
     * @memberof TreeGeoQuery
     */
    'TopLeft'?: TreeGeoPoint;
}
