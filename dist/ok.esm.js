import { mapFromObject } from 'lightdash';

/**
 * Checks if an input is a radio or a checkbox
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {boolean}
 */
const isCheckboxLike = (element) => element.type === "checkbox" || element.type === "radio";
/**
 * Returns input element specific value
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {string|boolean}
 */
const getInputElementValue = (element) => isCheckboxLike(element) ? element.checked : element.value;
/**
 * Ok main class
 *
 * @class
 */
const Ok = class {
    /**
     * Creates a new ok instance
     *
     * @constructor
     * @param {IOkValidators} validators
     * @param {string|false} [invalidClass="invalid"]
     */
    constructor(validators, invalidClass = "invalid") {
        this.map = mapFromObject(validators);
        this.invalidClass = invalidClass;
    }
    /**
     * Validates an input element
     *
     * @param {HTMLInputElement} element
     * @param {...any[]} args
     * @returns {boolean}
     */
    validate(element, ...args) {
        if (!element.dataset.ok) {
            throw new Error("no validator assigned");
        }
        const validatorKey = element.dataset.ok;
        if (!this.map.has(validatorKey)) {
            throw new Error(`missing validator '${validatorKey}'`);
        }
        const okEntry = this.map.get(validatorKey);
        const result = okEntry.fn(getInputElementValue(element), element, ...args);
        if (result) {
            if (this.invalidClass) {
                element.classList.remove(this.invalidClass);
            }
            element.setCustomValidity("");
        }
        else {
            if (this.invalidClass) {
                element.classList.add(this.invalidClass);
            }
            element.setCustomValidity(okEntry.msg);
        }
        return result;
    }
    /**
     * Binds an event handler to an input element
     *
     * @param {HTMLInputElement} element
     * @param {string} [eventType="input"]
     */
    bind(element, eventType = "input") {
        element.addEventListener(eventType, e => this.validate(element, e));
    }
};

export default Ok;
