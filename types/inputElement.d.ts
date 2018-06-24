/**
 * Checks if an input is a radio or a checkbox
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {boolean}
 */
declare const isInputElementCheckboxLike: (element: HTMLInputElement) => boolean;
/**
 * Returns input element specific value
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {string|boolean}
 */
declare const getInputElementValue: (element: HTMLInputElement) => string | boolean;
export { isInputElementCheckboxLike, getInputElementValue };
