var Ok = function () {
    'use strict';

    const DOM_ATTR = "ok";
    const DOM_ATTR_DATA = `[data-${DOM_ATTR}]`;
    const DOM_CLASS_INVALID = "invalid";

    /**
     * Loops over each element from querySelector
     * @param {Node} context
     * @param {String} selector
     * @param {Function} fn
     */
    const eachElement = (context, selector, fn) => Array.from(context.querySelectorAll(selector)).forEach(fn);

    /**
     * Applies Ok to all given forms
     * @param {Object} cfg Configuration object
     */
    const ok = function (cfg) {
        eachElement(document, cfg.el, form => {
            //Iterate over forms
            eachElement(form, DOM_ATTR_DATA, field => {
                //Iterate over inputs
                const fieldClassList = field.classList;
                const okEntryName = field.dataset[DOM_ATTR];
                const okEntry = cfg.validators[okEntryName];

                if (okEntry) {
                    //Check if the given validator exists
                    field.addEventListener("input", ev => {
                        /**
                         * Event listener
                         */
                        if (okEntry.fn(ev.target.value, ev)) {
                            //Runs validator and modifies input element based on result
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

    return ok;
}();