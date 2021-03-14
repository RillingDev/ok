import type { Validator } from "./Validator";

/**
 * Dictionary of validator name and validator instance.
 *
 * @public
 */
export interface ValidatorDictionary {
    readonly [key: string]: Validator;
}
