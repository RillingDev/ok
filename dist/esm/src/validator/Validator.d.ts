declare type HtmlInputValue = string | boolean;
declare type ValidationFunction<T> = (val: HtmlInputValue, element: HTMLInputElement, e?: Event) => T;
interface Validator {
    msg: string;
    fn: ValidationFunction<boolean>;
}
export { Validator };
//# sourceMappingURL=Validator.d.ts.map