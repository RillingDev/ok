import { ValidatorDictionary } from "./validator/ValidatorDictionary";
/**
 * Ok class.
 *
 * @class
 */
declare class Ok {
    private readonly map;
    private readonly invalidClass;
    /**
     * Ok constructor.
     *
     * @public
     * @param {object} validators Object containing the validators to use.
     * @param {string|boolean} [invalidClass="invalid"] CSS class for invalid elements, or false if none should be set.
     */
    constructor(validators: ValidatorDictionary, invalidClass?: string | false);
    /**
     * Validates an input element and returns if it was valid.
     * Usually called through {@link Ok#bind}.
     *
     * @public
     * @param {HTMLInputElement} element HTMLInputElement to validate.
     * @param {Event?} e optional event that triggered validation.
     * @returns {boolean} current validity of the element.
     */
    validate(element: HTMLInputElement, e?: Event): boolean;
    /**
     * Binds a {@link Ok#validate} event handler to an input element.
     *
     * @public
     * @param {HTMLInputElement} element HTMLInputElement to bind.
     * @param {string} [eventType="input"] Event type to bind.
     */
    bind(element: HTMLInputElement, eventType?: string): void;
}
export { Ok };
//# sourceMappingURL=Ok.d.ts.map