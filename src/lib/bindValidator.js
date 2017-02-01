"use strict";

import {
    DOM_ATTR,
    DOM_EVENT_INPUT
} from "./constants";
import debounce from "./debounce";

/**
 * Binds validator function to input
 *
 * @private
 * @param {Node} field Input Node
 * @param {Object} methods method container
 * @param {Number} timeout event tiemout
 * @param {String} invalidClass class to add to invalid input fields
 */
const bindValidator = function (field, methods, timeout, invalidClass) {
    const okMethodName = field.dataset[DOM_ATTR];
    const okMethod = methods[okMethodName];

    if (typeof okMethod === "function") {
        const debouncedValidator = debounce(val => {
            const result = okMethod(val);

            if (result) {
                field.classList.remove(invalidClass);
            } else {
                field.classList.add(invalidClass);
            }
        }, timeout);

        field.addEventListener(DOM_EVENT_INPUT, ev => {
            debouncedValidator(ev.target.value, ev);
        }, false);
    } else {
        throw new Error(`validator '${okMethodName}' missing`);
    }
};

export default bindValidator;
