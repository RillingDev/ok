import type { ValidatableElement } from "../dom/ValidatableElement";

/**
 * Function that returns a validation message.
 */
type ValidationMessageFunction<UElement extends ValidatableElement> = (
    element: UElement,
    e?: Event
) => string;

/**
 * Function that checks if the element value is valid.
 */
type ValidatorFunction<UElement extends ValidatableElement> = (
    element: UElement,
    e?: Event
) => boolean;

/**
 * Interface for a single validator.
 */
export interface Validator<
    UElement extends ValidatableElement = ValidatableElement
> {
    readonly fn: ValidatorFunction<UElement>;
    readonly msg: string | ValidationMessageFunction<UElement>;
}
