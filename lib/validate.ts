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
export function validate<T extends ValidatableElement>(
	element: T,
	validators: readonly Validator<T>[],
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
