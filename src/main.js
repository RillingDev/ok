"use strict";

import {
    DOM_EVENT_INPUT,
    DOM_ATTR_DATA,
    DOM_ATTR
} from "./lib/constants";
import toArray from "./lib/toArray";

/**
 * Applies Ok to all given forms
 *
 * @param {Object} cfg Configuration object
 */
const ok = function (cfg) {

    //Collect all inputs
    toArray(document.querySelectorAll(cfg.el)).forEach(form => {
        const fields = toArray(form.querySelectorAll(DOM_ATTR_DATA));

        //Bind each input
        fields.forEach(field => {
            const okEntryName = field.dataset[DOM_ATTR];
            const okEntry = cfg.validators[okEntryName];

            //Check if the given validator exists
            if (okEntry) {
                //Attach listener
                field.addEventListener(DOM_EVENT_INPUT, ev => {
                    field.setCustomValidity(okEntry.fn(ev.target.value, ev) ? "" : okEntry.msg);
                }, false);
            } else {
                throw new Error(`validator '${okEntryName}' missing`); //Throw if now validator was found
            }
        });
    });
};

export default ok;
