import { getInputElementValue } from "./dom/getInputElementValue";
import type { Validator } from "./validator/Validator";
import type { ValidatorDictionary } from "./validator/ValidatorDictionary";
import { setCustomValidity } from "./dom/setCustomValidity";

/**
 * @internal
 */
type ValidatorMap = Map<string, Validator>;

/**
 * Ok class.
 *
 * @class
 */
export class Ok {
    private readonly map: ValidatorMap;
    private readonly invalidClass: string | false;

    /**
     * Ok constructor.
     *
     * @public
     * @param {object} validators Object containing the validators to use.
     * @param {string|boolean} [invalidClass="invalid"] CSS class for invalid elements, or false if none should be set.
     */
    public constructor(
        validators: ValidatorDictionary,
        invalidClass: string | false = "invalid"
    ) {
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
    public validate(element: HTMLInputElement, e?: Event): boolean {
        const okAttr = element.dataset.ok;
        if (okAttr == null || okAttr.length === 0) {
            throw new Error("No validators are assigned to the element.");
        }
        const validatorList: string[] = okAttr
            .split(",")
            .map((str) => str.trim());

        const value = getInputElementValue(element);

        let result = true;
        for (const validatorListEntry of validatorList) {
            if (result) {
                if (!this.map.has(validatorListEntry)) {
                    throw new Error(
                        `Validator '${validatorListEntry}' is not registered.`
                    );
                }
                const validator: Validator = this.map.get(validatorListEntry)!;
                if (!validator.fn(value, element, e)) {
                    result = false;
                    const msg =
                        typeof validator.msg === "function"
                            ? validator.msg(value, element, e)
                            : validator.msg;
                    setCustomValidity(element, msg);
                }
            }
        }
        if (result) {
            setCustomValidity(element, "");
            if (this.invalidClass != false) {
                element.classList.remove(this.invalidClass);
            }
        } else if (this.invalidClass != false) {
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
    public bind(element: HTMLInputElement, eventType = "input"): void {
        element.addEventListener(eventType, (e) => this.validate(element, e));
    }
}
