interface IOkValidator {
    msg: string;
    fn: (val: string) => boolean;
}
interface IOkValidators {
    [key: string]: IOkValidator;
}
interface IOk {
    map: IOkValidators;
    bind: (element: HTMLInputElement) => void;
}
export { IOkValidator, IOkValidators, IOk };
