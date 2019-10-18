import { Validator } from "./validator/Validator";
import { ValidatorDictionary } from "./validator/ValidatorDictionary";
/**
 * @class
 */
declare const Ok: {
    new (validators: ValidatorDictionary, invalidClass?: string | false): {
        map: Map<string, Validator>;
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
//# sourceMappingURL=Ok.d.ts.map