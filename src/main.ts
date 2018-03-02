import { hasKey, mapFromObject } from "lightdash";
import { IOk, IOkValidator, IOkValidators } from "./interfaces";

/**
 * Checks if an input is a radio or a checkbox
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {boolean}
 */
const isCheckboxLike = (element: HTMLInputElement): boolean =>
    element.type === "checkbox" || element.type === "radio";

/**
 * Returns input element specific value
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {string|boolean}
 */
const getInputElementValue = (element: HTMLInputElement): string | boolean =>
    isCheckboxLike(element) ? element.checked : element.value;

/**
 * Ok main class
 *
 * @class
 */
const Ok = class implements IOk {
    public map;
    /**
     * Creates a new ok instance
     *
     * @constructor
     * @param {IOkValidators} validators
     */
    constructor(validators: IOkValidators) {
        this.map = mapFromObject(validators);
    }
    /**
     * Binds the fitting validator to an input element
     *
     * @param {HTMLInputElement} element
     */
    public bind(element: HTMLInputElement) {
        const validatorKey = element.dataset.ok;

        if (!this.map.has(validatorKey)) {
            throw new Error(`missing validator '${validatorKey}'`);
        }

        const okEntry = this.map.get(validatorKey);

        element.addEventListener("input", e => {
            if (
                okEntry.fn(getInputElementValue(<HTMLInputElement>e.target), e)
            ) {
                element.classList.remove("invalid");
                element.setCustomValidity("");
            } else {
                element.classList.add("invalid");
                element.setCustomValidity(okEntry.msg);
            }
        });
    }
};

export default Ok;
