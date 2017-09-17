/**
 * Loops over each element from querySelector
 *
 * @param {Node} context
 * @param {string} selector
 * @param {Function} fn
 */
const eachElement = (context, selector, fn) => Array.from(context.querySelectorAll(selector)).forEach(fn);

/**
 * Applies Ok on all given forms
 *
 * @param {Object} cfg Configuration object
 */
const ok = function (cfg) {
    //Iterate over forms matching selector
    eachElement(document, cfg.el, form => {
        //Iterate over inputs with data-ok
        eachElement(form, "[data-ok]", field => {
            const fieldClassList = field.classList;
            const okEntryName = field.dataset["ok"];
            const okEntry = cfg.validators[okEntryName];

            //Check if the given validator exists
            if (okEntry) {
                field.addEventListener("input", ev => {
                    //Runs validator and modifies input element based on result
                    if (okEntry.fn(ev.target.value, ev)) {
                        fieldClassList.remove("invalid");
                        field.setCustomValidity("");
                    } else {
                        fieldClassList.add("invalid");
                        field.setCustomValidity(okEntry.msg);
                    }
                }, false);
            } else {
                //Throw if the validator was not found
                throw new Error(`missing validator '${okEntryName}'`);
            }
        });
    });
};

export default ok;
