/**
 * Helper function to set validity status of elements.
 *
 * @private
 * @return If the current browser supports custom validity.
 */
const browserSupportsValidation = (): boolean =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    HTMLInputElement.prototype.setCustomValidity != null;

/**
 * Helper function to set validity status of elements.
 *
 * @private
 * @param element HTMLInputElement to set the validity status for.
 * @param msg Validity message to add.
 */
const setCustomValidity = (element: HTMLInputElement, msg: string): void => {
    if (browserSupportsValidation()) {
        element.setCustomValidity(msg);
    }
};

export { setCustomValidity };
