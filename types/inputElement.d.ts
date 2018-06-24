/**
 * Checks if an input is a radio or a checkbox.
 *
 * @private
 * @param {HTMLInputElement} element HTMLInputElement to check.
 * @returns {boolean} if the element is checkbox-like.
 */
declare const isInputElementCheckboxLike: (element: HTMLInputElement) => boolean;
/**
 * Returns input element specific value.
 *
 * @private
 * @param {HTMLInputElement} element HTMLInputElement to get the value of.
 * @returns {string|boolean} value of the element, either a string or a boolean.
 */
declare const getInputElementValue: (element: HTMLInputElement) => string | boolean;
export { isInputElementCheckboxLike, getInputElementValue };
