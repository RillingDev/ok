/**
 * Checks if an input is a radio or a checkbox.
 *
 * @private
 * @param element HTMLInputElement to check.
 * @returns if the element is checkbox-like.
 */
const isInputElementCheckboxLike = (element) => element.type === "checkbox" || element.type === "radio";
/**
 * Returns input element specific value.
 *
 * @private
 * @param element HTMLInputElement to get the value of.
 * @returns value of the element, either a string or a boolean.
 */
const getInputElementValue = (element) => isInputElementCheckboxLike(element) ? element.checked : element.value;
export { getInputElementValue };
//# sourceMappingURL=getInputElementValue.js.map