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
import type { IdmWorkspaceScope } from './idm-workspace-scope';
/**
 * Current workspace information, maybe published on the root node of a workspace
 * @export
 * @interface RestContextWorkspace
 */
export interface RestContextWorkspace {
    /**
     *
     * @type {string}
     * @memberof RestContextWorkspace
     */
    'Description'?: string;
    /**
     *
     * @type {boolean}
     * @memberof RestContextWorkspace
     */
    'IsRoot'?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof RestContextWorkspace
     */
    'IsVirtualRoot'?: boolean;
    /**
     *
     * @type {string}
     * @memberof RestContextWorkspace
     */
    'Label'?: string;
    /**
     *
     * @type {string}
     * @memberof RestContextWorkspace
     */
    'Permissions'?: string;
    /**
     *
     * @type {string}
     * @memberof RestContextWorkspace
     */
    'Quota'?: string;
    /**
     *
     * @type {string}
     * @memberof RestContextWorkspace
     */
    'QuotaUsage'?: string;
    /**
     *
     * @type {IdmWorkspaceScope}
     * @memberof RestContextWorkspace
     */
    'Scope'?: IdmWorkspaceScope;
    /**
     *
     * @type {boolean}
     * @memberof RestContextWorkspace
     */
    'SkipRecycle'?: boolean;
    /**
     *
     * @type {string}
     * @memberof RestContextWorkspace
     */
    'Slug': string;
    /**
     *
     * @type {boolean}
     * @memberof RestContextWorkspace
     */
    'Syncable'?: boolean;
    /**
     *
     * @type {string}
     * @memberof RestContextWorkspace
     */
    'Uuid': string;
}
