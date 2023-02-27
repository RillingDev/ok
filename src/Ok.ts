import type { Validator } from "./Validator";
import type { ValidatableElement } from "./ValidatableElement";

/**
 * Wraps a dictionary of validators and allows binding/applying it to DOM elements.
 */
export class Ok {
	readonly #map: Map<string, Validator<never>>;

	/**
	 * Creates a new instance.
	 *
	 * @param validators Object containing the validators to use.
	 *                   Each key corresponds to the key used when referencing the validator from the HTML attribute.
	 *                   The value contains the validator to apply. See {@link Validator} for details.
	 */
	constructor(validators: Record<string, Validator<never>>) {
		this.#map = new Map(Object.entries(validators));
	}

	/**
	 * Validates an input element and returns if it was valid.
	 * Usually called through {@link Ok#bind}.
	 *
	 * @param element ValidatableElement to validate.
	 * @param e Optional event that triggered validation.
	 * @returns validity of the element.
	 */
	validate<T extends ValidatableElement>(element: T, e?: Event): boolean {
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
	#getValidators<T extends ValidatableElement>(
		element: T
	): ReadonlyArray<Validator<T>> {
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
				return this.#map.get(validatorName) as Validator<T>; // This typing *could* be a lie if the consumer binds a validator to the wrong element.
			});
	}
}
