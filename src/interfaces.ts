import { okValidatorMap } from "./types";

interface IOkValidator {
    msg: string;
    fn: (val: string | boolean, element: Element, e?: Event) => boolean;
}

interface IOkValidators {
    [key: string]: IOkValidator;
}

interface IOk {
    map: okValidatorMap;
    invalidClass: string | false;
    validate: (element: HTMLInputElement, ...args: any[]) => boolean;
    bind: (element: HTMLInputElement, eventType?: string) => void;
}

export { IOkValidator, IOkValidators, IOk };
