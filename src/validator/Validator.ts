/**
 * @private
 */
type HtmlInputValue = string | boolean;

/**
 * A function which takes the input value of an element and the element itself.
 *
 * @private
 */
type ValidationFunction<TResult> = (
    val: HtmlInputValue,
    element: HTMLInputElement,
    e?: Event
) => TResult;

/**
 * Interface for a single validator.
 *
 * @public
 */
interface Validator {
    msg: string | ValidationFunction<string>;
    fn: ValidationFunction<boolean>;
}

export { Validator };
