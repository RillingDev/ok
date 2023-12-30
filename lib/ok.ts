import type { ValidatableElement, Validator } from "./validate.js";
import { validate } from "./validate.js";

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
	 *
	 * @param element ValidatableElement to validate.
	 * @returns validity of the element.
	 */
	validate<T extends ValidatableElement>(element: T): boolean {
		return validate(element, this.#getValidators(element));
	}

	/**
	 * @internal
	 */
	#getValidators<T extends ValidatableElement>(
		element: T,
	): readonly Validator<T>[] {
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
						`Validator for name '${validatorName}' is not registered.`,
					);
				}
				return this.#map.get(validatorName) as Validator<T>; // This typing *could* be a lie if the consumer binds a validator to the wrong element.
			});
	}
}
