import { Validator } from "./validator/Validator";
import { ValidatorDictionary } from "./validator/ValidatorDictionary";
declare type ValidatorMap = Map<string, Validator>;
/**
 * Ok class.
 *
 * @class
 */
declare const Ok: {
    new (validators: ValidatorDictionary, invalidClass?: string | false): {
        readonly map: ValidatorMap;
        readonly invalidClass: string | false;
        /**
         * Validates an input element and returns if it was valid.
         * Usually called through {@link Ok#bind}.
         *
         * @public
         * @param {HTMLInputElement} element HTMLInputElement to validate.
         * @param {Event?} e optional event that triggered validation.
         * @returns {boolean} current validity of the element.
         */
        validate(element: HTMLInputElement, e?: Event | undefined): boolean;
        /**
         * Binds a {@link Ok#validate} event handler to an input element.
         *
         * @public
         * @param {HTMLInputElement} element HTMLInputElement to bind.
         * @param {string} [eventType="input"] Event type to bind.
         */
        bind(element: HTMLInputElement, eventType?: string): void;
    };
};
export { Ok };
//# sourceMappingURL=Ok.d.ts.map