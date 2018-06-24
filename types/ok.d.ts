interface IOkValidator {
    msg: string;
    fn: (val: string | boolean, element: Element, e?: Event) => boolean;
}
interface IOkValidators {
    [key: string]: IOkValidator;
}
/**
 * @class
 */
declare const Ok: {
    new (validators: IOkValidators, invalidClass?: string | false): {
        map: Map<string, IOkValidator>;
        invalidClass: string | false;
        /**
         * Validates an input element and returns the validity.
         *
         * @public
         * @param {HTMLInputElement} element HTMLInputElement to validate.
         * @param {...any[]} args optional arguments to pass.
         * @returns {boolean} current validity of the element.
         */
        validate(element: HTMLInputElement, ...args: any[]): boolean;
        /**
         * Binds an event handler to an input element.
         *
         * @public
         * @param {HTMLInputElement} element HTMLInputElement to bind.
         * @param {string} [eventType="input"] event type to bind.
         */
        bind(element: HTMLInputElement, eventType?: string): void;
    };
};
export { Ok };
