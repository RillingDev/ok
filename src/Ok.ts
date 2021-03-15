import type { Validator } from "./validator/Validator";
import type { ValidatorDictionary } from "./validator/ValidatorDictionary";
import type { ValidatableElement } from "./dom/ValidatableElement";

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

    /**
     * Ok constructor.
     *
     * @public
     * @param validators Object containing the validators to use.
     */
    public constructor(validators: ValidatorDictionary) {
        this.map = new Map(Object.entries(validators));
    }

    /**
     * Validates an input element and returns if it was valid.
     * Usually called through {@link Ok#bind}.
     *
     * @internal
     * @param element ValidatableElement to validate.
     * @param e Optional event that triggered validation.
     * @returns validity of the element.
     */
    private validate(element: ValidatableElement, e?: Event): boolean {
        for (const validator of this.getValidators(element)) {
            if (!validator.fn(element, e)) {
                const msg =
                    typeof validator.msg === "function"
                        ? validator.msg(element, e)
                        : validator.msg;
                element.setCustomValidity(msg);
                return false;
            }
        }
        element.setCustomValidity("");
        return true;
    }

    private getValidators(element: ValidatableElement): Validator[] {
        const okAttr = element.dataset.ok;
        if (okAttr == null || okAttr.length === 0) {
            throw new Error("No validators are assigned to this element.");
        }
        return okAttr
            .split(",")
            .map((str) => str.trim())
            .map((validatorName) => {
                if (!this.map.has(validatorName)) {
                    throw new Error(
                        `Validator for name '${validatorName}' is not registered.`
                    );
                }
                return this.map.get(validatorName)!;
            });
    }

    /**
     * Binds a {@link Ok#validate} event handler to a validatable element.
     *
     * @public
     * @param element ValidatableElement to bind an event to.
     * @param eventType Event type to bind. Recommended is either 'input' or 'change'. Defaults to 'input'.
     */
    public bind(element: ValidatableElement, eventType = "input"): void {
        element.addEventListener(eventType, (e) => this.validate(element, e));
    }
}
