import { isUndefined } from "lightdash";
const browserSupportsValidation = () => 
// eslint-disable-next-line @typescript-eslint/unbound-method
!isUndefined(HTMLInputElement.prototype.setCustomValidity);
const setCustomValidity = (element, msg) => {
    if (browserSupportsValidation()) {
        element.setCustomValidity(msg);
    }
};
export { setCustomValidity };
//# sourceMappingURL=setCustomValidity.js.map