import { IOkValidator, IOkValidators } from "./interfaces";
/**
 * Ok class
 *
 * @public
 * @class
 * @param {IOkValidators} validators
 * @param {string|false} [invalidClass="invalid"]
 */
declare const Ok: {
    new (validators: IOkValidators, invalidClass?: string | false): {
        map: Map<string, IOkValidator>;
        invalidClass: string | false;
        validate(element: HTMLInputElement, ...args: any[]): boolean;
        bind(element: HTMLInputElement, eventType?: string): void;
    };
};
export default Ok;
