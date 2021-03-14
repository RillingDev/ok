import type { Validator } from "./Validator";

/**
 * Dictionary of validator name and validator instances.
 *
 * @public
 */
export interface ValidatorDictionary {
    [key: string]: Validator;
}
