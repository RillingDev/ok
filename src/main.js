"use strict";

import {
    DOM_ATTR_DATA,
    DOM_ATTR,
    DOM_CLASS_INVALID,
} from "./lib/constants";
import arrFromSelectorQuery from "./lib/arrFromSelectorQuery";

/**
 * Applies Ok to all given forms
 *
 * @param {Object} cfg Configuration object
 */
const ok = function (cfg) {
    arrFromSelectorQuery(document, cfg.el).forEach(form => { //Iterate over forms
        arrFromSelectorQuery(form, DOM_ATTR_DATA).forEach(field => { //Iterate over inputs
            const fieldClassList = field.classList;
            const okEntryName = field.dataset[DOM_ATTR];
            const okEntry = cfg.validators[okEntryName];

            //Check if the given validator exists
            if (okEntry) {
                field.addEventListener("input", ev => { //Attach listener
                    if (okEntry.fn(ev.target.value, ev)) { //Runs validator and modifies input element based on result
                        fieldClassList.remove(DOM_CLASS_INVALID);
                        field.setCustomValidity("");
                    } else {
                        fieldClassList.add(DOM_CLASS_INVALID);
                        field.setCustomValidity(okEntry.msg);
                    }
                }, false);
            } else {
                //Throw if no validator was found
                throw new Error(`missing validator '${okEntryName}'`);
            }
        });
    });
};

export default ok;
