import { IOkValidators } from "./interfaces";
/**
 * Ok main class
 *
 * @class
 */
declare const Ok: {
    new (validators: IOkValidators): {
        map: any;
        validate(element: HTMLInputElement, ...args: any[]): boolean;
        bind(element: HTMLInputElement, eventType?: string): void;
    };
};
export default Ok;
