type HtmlInputValue = string | boolean;

type ValidationFunction<T> = (
    val: HtmlInputValue,
    element: HTMLInputElement,
    e?: Event
) => T;

interface Validator {
    msg: string | ValidationFunction<string>;
    fn: ValidationFunction<boolean>;
}

export { Validator };
