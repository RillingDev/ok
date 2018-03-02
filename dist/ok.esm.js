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
     */
    constructor(validators) {
        this.map = mapFromObject(validators);
    }
    /**
     * Binds the fitting validator to an input element
     *
     * @param {HTMLInputElement} element
     */
    bind(element) {
        const validatorKey = element.dataset.ok;
        if (!this.map.has(validatorKey)) {
            throw new Error(`missing validator '${validatorKey}'`);
        }
        const okEntry = this.map.get(validatorKey);
        element.addEventListener("input", e => {
            if (okEntry.fn(getInputElementValue(e.target), e)) {
                element.classList.remove("invalid");
                element.setCustomValidity("");
            }
            else {
                element.classList.add("invalid");
                element.setCustomValidity(okEntry.msg);
            }
        });
    }
};

export default Ok;
