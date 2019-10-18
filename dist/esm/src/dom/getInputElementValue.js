import { isInputElementCheckboxLike } from "./isInputElementCheckboxLike";
/**
 * Returns input element specific value.
 *
 * @private
 * @param {HTMLInputElement} element HTMLInputElement to get the value of.
 * @returns {string|boolean} value of the element, either a string or a boolean.
 */
const getInputElementValue = (element) => isInputElementCheckboxLike(element) ? element.checked : element.value;
export { getInputElementValue };
//# sourceMappingURL=getInputElementValue.js.map