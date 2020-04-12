'use strict';

/**
 * Checks if an input is a radio or a checkbox.
 *
 * @private
 * @param element HTMLInputElement to check.
 * @returns if the element is checkbox-like.
 */
const isInputElementCheckboxLike = (element) => element.type === "checkbox" || element.type === "radio";
/**
 * Returns input element specific value.
 *
 * @private
 * @param element HTMLInputElement to get the value of.
 * @returns value of the element, either a string or a boolean.
 */
const getInputElementValue = (element) => isInputElementCheckboxLike(element) ? element.checked : element.value;

/**
 * Helper function to set validity status of elements.
 *
 * @private
 * @return If the current browser supports custom validity.
 */
const browserSupportsValidation = () => HTMLInputElement.prototype.setCustomValidity != null;
/**
 * Helper function to set validity status of elements.
 *
 * @private
 * @param element HTMLInputElement to set the validity status for.
 * @param msg Validity message to add.
 */
const setCustomValidity = (element, msg) => {
    if (browserSupportsValidation()) {
        element.setCustomValidity(msg);
    }
};

/**
 * Ok class.
 *
 * @class
 */
class Ok {
    /**
     * Ok constructor.
     *
     * @public
     * @param {object} validators Object containing the validators to use.
     * @param {string|boolean} [invalidClass="invalid"] CSS class for invalid elements, or false if none should be set.
     */
    constructor(validators, invalidClass = "invalid") {
        this.map = new Map(Object.entries(validators));
        this.invalidClass = invalidClass;
    }
    /**
     * Validates an input element and returns if it was valid.
     * Usually called through {@link Ok#bind}.
     *
     * @public
     * @param {HTMLInputElement} element HTMLInputElement to validate.
     * @param {Event?} e optional event that triggered validation.
     * @returns {boolean} current validity of the element.
     */
    validate(element, e) {
        if (!element.dataset.ok) {
            throw new Error("No validators are assigned to the element.");
        }
        const validatorList = element.dataset.ok
            .split(",")
            .map((str) => str.trim());
        const value = getInputElementValue(element);
        let result = true;
        for (const validatorListEntry of validatorList) {
            if (result) {
                if (!this.map.has(validatorListEntry)) {
                    throw new Error(`Validator '${validatorListEntry}' is not registered.`);
                }
                const validator = this.map.get(validatorListEntry);
                if (!validator.fn(value, element, e)) {
                    result = false;
                    const msg = typeof validator.msg === "function"
                        ? validator.msg(value, element, e)
                        : validator.msg;
                    setCustomValidity(element, msg);
                }
            }
        }
        if (result) {
            setCustomValidity(element, "");
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
     * Binds a {@link Ok#validate} event handler to an input element.
     *
     * @public
     * @param {HTMLInputElement} element HTMLInputElement to bind.
     * @param {string} [eventType="input"] Event type to bind.
     */
    bind(element, eventType = "input") {
        element.addEventListener(eventType, (e) => this.validate(element, e));
    }
}

module.exports = Ok;
//# sourceMappingURL=ok.common.js.map
