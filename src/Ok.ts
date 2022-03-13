import type { Validator } from "./validator/Validator";
import type { ValidatableElement } from "./dom/ValidatableElement";

/**
 * Wraps a dictionary of validators and allows binding/applying it to DOM elements.
 */
export class Ok {
	readonly #map: Map<string, Validator>;

	/**
	 * Creates a new instance.
	 *
	 * @param validators Object containing the validators to use.
	 *                   Each key corresponds to the key used when referencing the validator from the HTML attribute.
	 *                   The value contains the validator to apply. See {@link Validator} for details.
	 */
	constructor(validators: Record<string, Validator>) {
		this.#map = new Map(Object.entries(validators));
	}

	/**
	 * Binds a {@link Ok#validate} event handler to a validatable element.
	 *
	 * @param element ValidatableElement to bind an event to.
	 * @param eventType Event type to bind. Recommended is either 'input' or 'change'. Defaults to 'input'.
	 */
	bind(element: ValidatableElement, eventType = "input"): void {
		element.addEventListener(eventType, (e) => this.validate(element, e));
	}

	/**
	 * Validates an input element and returns if it was valid.
	 * Usually called through {@link Ok#bind}.
	 *
	 * @param element ValidatableElement to validate.
	 * @param e Optional event that triggered validation.
	 * @returns validity of the element.
	 */
	validate(element: ValidatableElement, e?: Event): boolean {
		for (const validator of this.#getValidators(element)) {
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

	/**
	 * @internal
	 */
	#getValidators(element: ValidatableElement): ReadonlyArray<Validator> {
		const okAttr = element.dataset.ok;
		if (okAttr == null || okAttr.length === 0) {
			throw new Error("No validators are assigned to this element.");
		}
		return okAttr
			.split(",")
			.map((str) => str.trim())
			.map((validatorName) => {
				if (!this.#map.has(validatorName)) {
					throw new Error(
						`Validator for name '${validatorName}' is not registered.`
					);
				}
				return this.#map.get(validatorName)!;
			});
	}
}
