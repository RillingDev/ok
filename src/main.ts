import { mapFromObject } from "lightdash";
import { IOk, IOkValidator, IOkValidators } from "./interfaces";
import { okValidatorMap } from "./types";

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
 * Ok class
 *
 * @public
 * @class
 * @param {IOkValidators} validators
 * @param {string|false} [invalidClass="invalid"]
 */
const Ok = class implements IOk {
    public map: okValidatorMap;
    public invalidClass: string | false;

    constructor(
        validators: IOkValidators,
        invalidClass: string | false = "invalid"
    ) {
        this.map = <Map<string, IOkValidator>>mapFromObject(validators);
        this.invalidClass = invalidClass;
    }
    /**
     * Validates an input element and returns the validity
     *
     * @public
     * @param {HTMLInputElement} element
     * @param {...any[]} args
     * @returns {boolean}
     */
    public validate(element: HTMLInputElement, ...args: any[]): boolean {
        if (!element.dataset.ok) {
            throw new Error("no validator assigned");
        }
        const validatorKey: string = element.dataset.ok;
        if (!this.map.has(validatorKey)) {
            throw new Error(`missing validator '${validatorKey}'`);
        }
        const okEntry = <IOkValidator>this.map.get(validatorKey);
        const result = okEntry.fn(
            getInputElementValue(element),
            element,
            ...args
        );

        if (result) {
            if (this.invalidClass) {
                element.classList.remove(this.invalidClass);
            }
            element.setCustomValidity("");
        } else {
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
     * @public
     * @param {HTMLInputElement} element
     * @param {string} [eventType="input"]
     */
    public bind(element: HTMLInputElement, eventType: string = "input") {
        element.addEventListener(eventType, e => this.validate(element, e));
    }
};

export default Ok;
