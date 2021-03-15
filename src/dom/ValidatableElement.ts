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

/**
 * Returns element specific value. Usually this is a string, but can have other values such as a boolean for checkboxes.
 *
 * @internal
 * @param element ValidatableElement to get the value of.
 * @returns value of the element.
 */
export const getValidatableElementValue = (
    element: ValidatableElement
): ValidatableElementValue => {
    if (
        element instanceof HTMLInputElement &&
        (element.type === "checkbox" || element.type === "radio")
    ) {
        return element.checked;
    }
    return element.value;
};
