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
import type { TreeSearchFacet } from './TreeSearchFacet';
import {
    TreeSearchFacetFromJSON,
    TreeSearchFacetFromJSONTyped,
    TreeSearchFacetToJSON,
    TreeSearchFacetToJSONTyped,
} from './TreeSearchFacet';
import type { RestPagination } from './RestPagination';
import {
    RestPaginationFromJSON,
    RestPaginationFromJSONTyped,
    RestPaginationToJSON,
    RestPaginationToJSONTyped,
} from './RestPagination';
import type { RestNode } from './RestNode';
import {
    RestNodeFromJSON,
    RestNodeFromJSONTyped,
    RestNodeToJSON,
    RestNodeToJSONTyped,
} from './RestNode';

/**
 * 
 * @export
 * @interface RestNodeCollection
 */
export interface RestNodeCollection {
    /**
     * 
     * @type {Array<TreeSearchFacet>}
     * @memberof RestNodeCollection
     */
    facets?: Array<TreeSearchFacet>;
    /**
     * 
     * @type {Array<RestNode>}
     * @memberof RestNodeCollection
     */
    nodes: Array<RestNode>;
    /**
     * 
     * @type {RestPagination}
     * @memberof RestNodeCollection
     */
    pagination?: RestPagination;
}

/**
 * Check if a given object implements the RestNodeCollection interface.
 */
export function instanceOfRestNodeCollection(value: object): value is RestNodeCollection {
    if (!('nodes' in value) || value['nodes'] === undefined) return false;
    return true;
}

export function RestNodeCollectionFromJSON(json: any): RestNodeCollection {
    return RestNodeCollectionFromJSONTyped(json, false);
}

export function RestNodeCollectionFromJSONTyped(json: any, ignoreDiscriminator: boolean): RestNodeCollection {
    if (json == null) {
        return json;
    }
    return {
        
        'facets': json['Facets'] == null ? undefined : ((json['Facets'] as Array<any>).map(TreeSearchFacetFromJSON)),
        'nodes': ((json['Nodes'] as Array<any>).map(RestNodeFromJSON)),
        'pagination': json['Pagination'] == null ? undefined : RestPaginationFromJSON(json['Pagination']),
    };
}

export function RestNodeCollectionToJSON(json: any): RestNodeCollection {
    return RestNodeCollectionToJSONTyped(json, false);
}

export function RestNodeCollectionToJSONTyped(value?: RestNodeCollection | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'Facets': value['facets'] == null ? undefined : ((value['facets'] as Array<any>).map(TreeSearchFacetToJSON)),
        'Nodes': ((value['nodes'] as Array<any>).map(RestNodeToJSON)),
        'Pagination': RestPaginationToJSON(value['pagination']),
    };
}

