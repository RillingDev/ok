import { isUndefined } from "lightdash";
/**
 * Helper function to set validity status of elements.
 *
 * @private
 * @return If the current browser supports custom validity.
 */
const browserSupportsValidation = () => 
// eslint-disable-next-line @typescript-eslint/unbound-method
!isUndefined(HTMLInputElement.prototype.setCustomValidity);
/**
 * Helper function to set validity status of elements.
 *
 * @private
 * @param element HTMLInputElement to set the validity status for.
 * @param msg Validity message to add.
 */
const setCustomValidity = (element, msg) => {
    if (browserSupportsValidation()) {
        element.setCustomValidity(msg);
    }
};
export { setCustomValidity };
//# sourceMappingURL=setCustomValidity.js.map