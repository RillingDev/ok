import { IOkValidators } from "./interfaces";
/**
 * Ok main class
 *
 * @class
 */
declare const Ok: {
    new (validators: IOkValidators): {
        map: any;
        bind(element: HTMLInputElement): void;
    };
};
export default Ok;
