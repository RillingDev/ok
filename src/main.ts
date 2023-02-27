/**
 * Object allowing for programmatic validity configuration.
 * The shared method of doing so is the respective #setCustomValidity(string) method.
 *
 * Some other elements also have such a method but are not suitable for Ok, such as
 * {@link HTMLObjectElement} and {@link HTMLButtonElement}.
 */
export type ValidatableElement =
	| HTMLInputElement
	| HTMLTextAreaElement
	| HTMLSelectElement
	| HTMLFieldSetElement;

/**
 * Interface for a single validator.
 */
export interface Validator<T extends ValidatableElement> {
	readonly fn: (element: T) => boolean;
	readonly msg: string | ((element: T) => string);
}

/**
 * Validates an input element and returns if it was valid.
 *
 * @param element ValidatableElement to validate.
 * @param validators Validators to run.
 * @returns validity of the element.
 */
function validate<T extends ValidatableElement>(
	element: T,
	validators: ReadonlyArray<Validator<T>>
): boolean {
	for (const validator of validators) {
		if (!validator.fn(element)) {
			const msg =
				typeof validator.msg === "function"
					? validator.msg(element)
					: validator.msg;
			element.setCustomValidity(msg);
			return false;
		}
	}
	element.setCustomValidity("");
	return true;
}

export { validate as ok };

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
