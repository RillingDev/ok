import type {
    ValidatableElement,
    ValidatableElementValue,
} from "../dom/ValidatableElement";

/**
 * A function which takes the input value of an element and the element itself.
 *
 * @internal
 */
type ValidatableElementFunction<
    TResult,
    UElement extends ValidatableElement,
    VElementValue extends ValidatableElementValue
> = (val: VElementValue, element: UElement, e?: Event) => TResult;

/**
 * Function that returns a validation message.
 *
 * @public
 */
type ValidationMessageFunction<
    UElement extends ValidatableElement,
    VElementValue extends ValidatableElementValue
> = ValidatableElementFunction<string, UElement, VElementValue>;

/**
 * Function that checks if the element value is valid.
 *
 * @public
 */
type ValidatorFunction<
    UElement extends ValidatableElement,
    VElementValue extends ValidatableElementValue
> = ValidatableElementFunction<boolean, UElement, VElementValue>;

/**
 * Interface for a single validator.
 *
 * @public
 */
export interface Validator<
    UElement extends ValidatableElement = ValidatableElement,
    VElementValue extends ValidatableElementValue = ValidatableElementValue
> {
    fn: ValidatorFunction<UElement, VElementValue>;
    msg: string | ValidationMessageFunction<UElement, VElementValue>;
}
