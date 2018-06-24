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
         * Validates an input element and returns the validity
         *
         * @public
         * @param {HTMLInputElement} element
         * @param {...any[]} args
         * @returns {boolean}
         */
        validate(element: HTMLInputElement, ...args: any[]): boolean;
        /**
         * Binds an event handler to an input element
         *
         * @public
         * @param {HTMLInputElement} element
         * @param {string} [eventType="input"]
         */
        bind(element: HTMLInputElement, eventType?: string): void;
    };
};
export { Ok };
