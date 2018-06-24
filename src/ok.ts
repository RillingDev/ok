import { mapFromObject } from "lightdash";
import { getInputElementValue } from "./inputElement";

type okValidatorMap = Map<string, IOkValidator>;

interface IOkValidator {
    msg: string;
    fn: (val: string | boolean, element: Element, e?: Event) => boolean;
}

interface IOkValidators {
    [key: string]: IOkValidator;
}

/**
 * @class
 */
const Ok = class {
    public map: okValidatorMap;
    public invalidClass: string | false;
    /**
     * Ok class
     *
     * @public
     * @param {object} validators
     * @param {string|false} [invalidClass="invalid"]
     */
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
                const validator = <IOkValidator>this.map.get(
                    validatorListEntry
                );

                if (!validator.fn(value, element, ...args)) {
                    result = false;
                    element.setCustomValidity(validator.msg);
                }
            }
        });

        if (result) {
            if (this.invalidClass) {
                element.classList.remove(this.invalidClass);
            }
            element.setCustomValidity("");
        } else if (this.invalidClass) {
            element.classList.add(this.invalidClass);
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
    public bind(element: HTMLInputElement, eventType: string = "input"): void {
        element.addEventListener(eventType, e => this.validate(element, e));
    }
};

export { Ok };
