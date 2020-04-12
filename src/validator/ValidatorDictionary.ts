import { Validator } from "./Validator";

/**
 * Dictionary of validator name and validator instances.
 *
 * @public
 */
interface ValidatorDictionary {
    [key: string]: Validator;
}

export { ValidatorDictionary };
