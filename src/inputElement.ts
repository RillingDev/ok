/**
 * Checks if an input is a radio or a checkbox
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {boolean}
 */
const isInputElementCheckboxLike = (element: HTMLInputElement): boolean =>
    element.type === "checkbox" || element.type === "radio";

/**
 * Returns input element specific value
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {string|boolean}
 */
const getInputElementValue = (element: HTMLInputElement): string | boolean =>
    isInputElementCheckboxLike(element) ? element.checked : element.value;

export { isInputElementCheckboxLike, getInputElementValue };
