import type { ValidatableElement } from "../dom/ValidatableElement";

/**
 * @internal
 */
type ValidatableElementFunction<
    TResult,
    UElement extends ValidatableElement
> = (element: UElement, e?: Event) => TResult;

/**
 * Function that returns a validation message.
 *
 * @public
 */
type ValidationMessageFunction<
    UElement extends ValidatableElement
> = ValidatableElementFunction<string, UElement>;

/**
 * Function that checks if the element value is valid.
 *
 * @public
 */
type ValidatorFunction<
    UElement extends ValidatableElement
> = ValidatableElementFunction<boolean, UElement>;

/**
 * Interface for a single validator.
 *
 * @public
 */
export interface Validator<
    UElement extends ValidatableElement = ValidatableElement
> {
    fn: ValidatorFunction<UElement>;
    msg: string | ValidationMessageFunction<UElement>;
}
