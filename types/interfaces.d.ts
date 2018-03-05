interface IOkValidator {
    msg: string;
    fn: (val: string, element: Element, e?: Event) => boolean;
}
interface IOkValidators {
    [key: string]: IOkValidator;
}
interface IOk {
    map: IOkValidators;
    validate: (element: HTMLInputElement, ...args: any[]) => boolean;
    bind: (element: HTMLInputElement, eventType?: string) => void;
}
export { IOkValidator, IOkValidators, IOk };
