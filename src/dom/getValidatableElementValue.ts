import type { ValidatableElement } from "./ValidatableElement";

/**
 * Returns element specific value. Usually this is a string, but can have other values such as a boolean for checkboxes.
 *
 * @internal
 * @param element ValidatableElement to get the value of.
 * @returns value of the element.
 */
export const getValidatableElementValue = (
    element: ValidatableElement
): string | boolean => {
    if (
        element instanceof HTMLInputElement &&
        (element.type === "checkbox" || element.type === "radio")
    ) {
        return element.checked;
    }
    return element.value;
};
