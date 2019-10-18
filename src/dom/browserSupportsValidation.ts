import { isUndefined } from "lightdash";

const browserSupportsValidation = (): boolean =>
    // eslint-disable-next-line @typescript-eslint/unbound-method
    !isUndefined(HTMLInputElement.prototype.setCustomValidity);

export { browserSupportsValidation };
