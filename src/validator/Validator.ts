interface Validator {
    msg: string;
    fn: (val: string | boolean, element: Element, e?: Event) => boolean;
}

export { Validator };
