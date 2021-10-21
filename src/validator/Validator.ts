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
export interface Validator {
	readonly fn: ValidatorFunction<ValidatableElement>;
	readonly msg: string | ValidationMessageFunction<ValidatableElement>;
}
