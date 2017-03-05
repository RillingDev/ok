'use strict';

const DOM_ATTR = "ok";
const DOM_ATTR_DATA = `[data-${DOM_ATTR}]`;
const DOM_CLASS_INVALID = "invalid";

/**
 * Returns "normal" array from query selector
 * @param {Node} context
 * @param {String} selector
 * @returns {Array}
 */
const arrFromSelectorQuery = (context, selector) => Array.from(context.querySelectorAll(selector));

/**
 * Applies Ok to all given forms
 *
 * @param {Object} cfg Configuration object
 */
const ok = function (cfg) {
    arrFromSelectorQuery(document, cfg.el).forEach(form => { //Iterate over forms
        arrFromSelectorQuery(form, DOM_ATTR_DATA).forEach(field => { //Iterate over inputs
            const okEntryName = field.dataset[DOM_ATTR];
            const okEntry = cfg.validators[okEntryName];

            //Check if the given validator exists
            if (okEntry) {
                field.addEventListener("input", ev => { //Attach listener
                    if (okEntry.fn(ev.target.value, ev)) {//Runs validator and modifies input element based on result
                        field.classList.remove(DOM_CLASS_INVALID);
                        field.setCustomValidity("");
                    } else {
                        field.classList.add(DOM_CLASS_INVALID);
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

module.exports = ok;
