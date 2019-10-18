import { isUndefined } from "lightdash";
const browserSupportsValidation = () => !isUndefined(HTMLInputElement.prototype.setCustomValidity);
export { browserSupportsValidation };
//# sourceMappingURL=browserSupportsValidation.js.map