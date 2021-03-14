import type { ValidatableElement } from "./ValidatableElement";

/**
 * Helper function to set validity status of elements.
 * It is assumed that if {@link HTMLInputElement} supports it, other {@link ValidatableElement}s also do.
 *
 * @internal
 * @return If the current browser supports custom validity.
 */
const browserSupportsValidation = (): boolean =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    HTMLInputElement.prototype.setCustomValidity != null;

/**
 * Helper function to set validity status of elements.
 *
 * @internal
 * @param element Element to set the validity status for.
 * @param msg Validity message to add. May be an empty string to communicate successful validation.
 */
export const setCustomValidity = (
    element: ValidatableElement,
    msg: string
): void => {
    if (browserSupportsValidation()) {
        element.setCustomValidity(msg);
    }
};
