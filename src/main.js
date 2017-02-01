"use strict";

import {
    DOM_EVENT_TIMEOUT,
    DOM_ATTR_DATA,
    DOM_CLASS_INVALID,
} from "./lib/constants";
import bindValidator from "./lib/bindValidator";


/**
 * Applies Ok to all given forms
 *
 * @param {Object} cfg Configuration object
 */
const Ok = function (cfg) {
    const $context = document.querySelectorAll(cfg.el);
    const timeout = cfg.timeout || DOM_EVENT_TIMEOUT;
    const invalidClass = cfg.invalidClass || DOM_CLASS_INVALID;

    //Binds on each input that has the attribute
    Array.from($context).forEach(form => {
        const fields = Array.from(form.querySelectorAll(DOM_ATTR_DATA));

        fields.forEach(field => {
            bindValidator(
                field,
                methods,
                timeout,
                invalidClass
            );
        });
    });
};

export default Ok;
