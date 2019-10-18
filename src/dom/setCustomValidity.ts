import { isUndefined } from "lightdash";

const browserSupportsValidation = (): boolean =>
    // eslint-disable-next-line @typescript-eslint/unbound-method
    !isUndefined(HTMLInputElement.prototype.setCustomValidity);

const setCustomValidity = (element: HTMLInputElement, msg: string): void => {
    if (browserSupportsValidation()) {
        element.setCustomValidity(msg);
    }
};

export { setCustomValidity };
