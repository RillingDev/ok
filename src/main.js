"use strict";

import {
    DOM_ATTR_DATA,
    DOM_ATTR,
    DOM_CLASS_INVALID,
} from "./lib/constants";
import eachElement from "./lib/eachElement";

/**
 * Applies Ok to all given forms
 * @param {Object} cfg Configuration object
 */
const ok = function (cfg) {
    eachElement(document, cfg.el, form => { //Iterate over forms
        eachElement(form, DOM_ATTR_DATA, field => { //Iterate over inputs
            const fieldClassList = field.classList;
            const okEntryName = field.dataset[DOM_ATTR];
            const okEntry = cfg.validators[okEntryName];

            if (okEntry) { //Check if the given validator exists
                field.addEventListener("input", ev => {
                    /**
                     * Event listener
                     */
                    if (okEntry.fn(ev.target.value, ev)) { //Runs validator and modifies input element based on result
                        fieldClassList.remove(DOM_CLASS_INVALID);
                        field.setCustomValidity("");
                    } else {
                        fieldClassList.add(DOM_CLASS_INVALID);
                        field.setCustomValidity(okEntry.msg);
                    }
                }, false);
            } else {
                throw new Error(`missing validator '${okEntryName}'`); //Throw if no validator was found
            }
        });
    });
};

export default ok;
