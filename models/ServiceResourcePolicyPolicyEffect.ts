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
export const ServiceResourcePolicyPolicyEffect = {
    Deny: 'deny',
    Allow: 'allow'
} as const;
export type ServiceResourcePolicyPolicyEffect = typeof ServiceResourcePolicyPolicyEffect[keyof typeof ServiceResourcePolicyPolicyEffect];


export function instanceOfServiceResourcePolicyPolicyEffect(value: any): boolean {
    for (const key in ServiceResourcePolicyPolicyEffect) {
        if (Object.prototype.hasOwnProperty.call(ServiceResourcePolicyPolicyEffect, key)) {
            if (ServiceResourcePolicyPolicyEffect[key as keyof typeof ServiceResourcePolicyPolicyEffect] === value) {
                return true;
            }
        }
    }
    return false;
}

export function ServiceResourcePolicyPolicyEffectFromJSON(json: any): ServiceResourcePolicyPolicyEffect {
    return ServiceResourcePolicyPolicyEffectFromJSONTyped(json, false);
}

export function ServiceResourcePolicyPolicyEffectFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServiceResourcePolicyPolicyEffect {
    return json as ServiceResourcePolicyPolicyEffect;
}

export function ServiceResourcePolicyPolicyEffectToJSON(value?: ServiceResourcePolicyPolicyEffect | null): any {
    return value as any;
}

export function ServiceResourcePolicyPolicyEffectToJSONTyped(value: any, ignoreDiscriminator: boolean): ServiceResourcePolicyPolicyEffect {
    return value as ServiceResourcePolicyPolicyEffect;
}

