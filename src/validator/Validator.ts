import type {
    ValidatableElement,
    ValidatableElementValue,
} from "../dom/ValidatableElement";

/**
 * A function which takes the input value of an element and the element itself.
 *
 * @internal
 */
type ValidatableElementFunction<TResult> = (
    val: ValidatableElementValue,
    element: ValidatableElement,
    e?: Event
) => TResult;

/**
 * Function that returns a validation message.
 *
 * @public
 */
type ValidationMessageFunction = ValidatableElementFunction<string>;

/**
 * Function that checks if the element value is valid.
 *
 * @public
 */
type ValidatorFunction = ValidatableElementFunction<boolean>;

/**
 * Interface for a single validator.
 *
 * @public
 */
export interface Validator {
    fn: ValidatorFunction;
    msg: string | ValidationMessageFunction;
}
