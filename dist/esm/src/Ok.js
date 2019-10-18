import { mapFromObject } from "lightdash";
import { browserSupportsValidation } from "./dom/browserSupportsValidation";
import { getInputElementValue } from "./dom/getInputElementValue";
/**
 * @class
 */
const Ok = class {
    /**
     * Ok class.
     *
     * @public
     * @param {object} validators object containing the validators to use.
     * @param {string|boolean} [invalidClass="invalid"] CSS class for invalid elements, or false if none should be set.
     */
    constructor(validators, invalidClass = "invalid") {
        this.map = mapFromObject(validators);
        this.invalidClass = invalidClass;
    }
    /**
     * Validates an input element and returns the validity.
     *
     * @public
     * @param {HTMLInputElement} element HTMLInputElement to validate.
     * @param {...any[]} args optional arguments to pass.
     * @returns {boolean} current validity of the element.
     */
    validate(element, ...args) {
        if (!element.dataset.ok) {
            throw new Error("no validator assigned");
        }
        const value = getInputElementValue(element);
        const validatorList = element.dataset.ok
            .split(",")
            .map(str => str.trim());
        let result = true;
        validatorList.forEach(validatorListEntry => {
            if (result) {
                if (!this.map.has(validatorListEntry)) {
                    throw new Error(`missing validator '${validatorListEntry}'`);
                }
                const validator = this.map.get(validatorListEntry);
                if (!validator.fn(value, element, ...args)) {
                    result = false;
                    if (browserSupportsValidation()) {
                        element.setCustomValidity(validator.msg);
                    }
                }
            }
        });
        if (result) {
            if (browserSupportsValidation()) {
                element.setCustomValidity("");
            }
            if (this.invalidClass) {
                element.classList.remove(this.invalidClass);
            }
        }
        else if (this.invalidClass) {
            element.classList.add(this.invalidClass);
        }
        return result;
    }
    /**
     * Binds an event handler to an input element.
     *
     * @public
     * @param {HTMLInputElement} element HTMLInputElement to bind.
     * @param {string} [eventType="input"] event type to bind.
     */
    bind(element, eventType = "input") {
        element.addEventListener(eventType, e => this.validate(element, e));
    }
};
export { Ok };
//# sourceMappingURL=Ok.js.map