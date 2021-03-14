/**
 * Object allowing for programmatic validity configuration.
 * The shared method of doing so is the respective #setCustomValidity(string) method.
 *
 * Some other elements also have such a method but are not suitable for Ok, such as
 * {@link HTMLFieldSetElement}, {@link HTMLObjectElement} and {@link HTMLButtonElement}.
 *
 * @public
 */
export type ValidatableElement =
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement;

/**
 * @internal
 */
export type ValidatableElementValue = string | boolean;
