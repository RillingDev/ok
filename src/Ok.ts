import { mapFromObject } from "lightdash";
import { browserSupportsValidation } from "./dom/browserSupportsValidation";
import { getInputElementValue } from "./dom/getInputElementValue";
import { IValidator } from "./validator/IValidator";
import { IValidators } from "./validator/IValidators";
import { validatorMap } from "./validator/validatorMap";

/**
 * @class
 */
const Ok = class {
    public map: validatorMap;
    public invalidClass: string | false;

    /**
     * Ok class.
     *
     * @public
     * @param {object} validators object containing the validators to use.
     * @param {string|boolean} [invalidClass="invalid"] CSS class for invalid elements, or false if none should be set.
     */
    constructor(
        validators: IValidators,
        invalidClass: string | false = "invalid"
    ) {
        this.map = <Map<string, IValidator>>mapFromObject(validators);
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
    public validate(element: HTMLInputElement, ...args: any[]): boolean {
        if (!element.dataset.ok) {
            throw new Error("no validator assigned");
        }

        const value = getInputElementValue(element);
        const validatorList: string[] = element.dataset.ok
            .split(",")
            .map(str => str.trim());
        let result = true;

        validatorList.forEach(validatorListEntry => {
            if (result) {
                if (!this.map.has(validatorListEntry)) {
                    throw new Error(
                        `missing validator '${validatorListEntry}'`
                    );
                }

                const validator = <IValidator>this.map.get(validatorListEntry);

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
        } else if (this.invalidClass) {
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
    public bind(element: HTMLInputElement, eventType: string = "input"): void {
        element.addEventListener(eventType, e => this.validate(element, e));
    }
};

export { Ok };
