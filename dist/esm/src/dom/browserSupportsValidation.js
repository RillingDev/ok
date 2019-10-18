import { isUndefined } from "lightdash";
const browserSupportsValidation = () => 
// eslint-disable-next-line @typescript-eslint/unbound-method
!isUndefined(HTMLInputElement.prototype.setCustomValidity);
export { browserSupportsValidation };
//# sourceMappingURL=browserSupportsValidation.js.map