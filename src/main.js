"use strict";

import {
    DOM_EVENT_INPUT,
    DOM_EVENT_TIMEOUT,
    DOM_ATTR_DATA,
    DOM_ATTR
} from "./lib/constants";
import debounce from "./lib/debounce";

/**
 * Applies Ok to all given forms
 *
 * @param {Object} cfg Configuration object
 */
const Ok = function (cfg) {
    const $timeout = cfg.timeout || DOM_EVENT_TIMEOUT;

    //Collect all inputs
    Array.from(document.querySelectorAll(cfg.el)).forEach(form => {
        const fields = Array.from(form.querySelectorAll(DOM_ATTR_DATA));

        //Bind each input
        fields.forEach(field => {
            const okEntryName = field.dataset[DOM_ATTR];
            const okEntry = cfg.validators[okEntryName];

            //Check if the given validator exists
            if (okEntry) {
                const eventFn = function (val) { //Validator event
                    field.setCustomValidity(okEntry.fn(val) ? "" : okEntry.msg);
                };
                const debouncedEventFn = debounce(eventFn, $timeout); //Debounce validator to avoid lag

                //Attach listener
                field.addEventListener(DOM_EVENT_INPUT, ev => {
                    debouncedEventFn(ev.target.value, ev);
                }, false);
            } else {
                throw new Error(`validator '${okEntryName}' missing`); //Throw if now validator was found
            }
        });
    });
};

export default Ok;
