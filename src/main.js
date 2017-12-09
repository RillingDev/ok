import { arrFrom, forEach } from "lightdash";

/**
 * Loops over each element from querySelector
 *
 * @param {Node} context
 * @param {string} selector
 * @param {Function} fn
 */
const forEachElement = (context, selector, fn) =>
    forEach(arrFrom(context.querySelectorAll(selector)), fn);

/**
 * Applies Ok on all given forms
 *
 * @param {Object} cfg Configuration object
 */
const ok = function(cfg) {
    //Iterate over forms matching selector
    forEachElement(document, cfg.el, form => {
        //Iterate over inputs with data-ok
        forEachElement(form, "[data-ok]", field => {
            const okEntryName = field.dataset["ok"];
            const okEntry = cfg.validators[okEntryName];

            //Check if the given validator exists
            if (okEntry) {
                field.addEventListener(
                    "input",
                    e => {
                        //Runs validator and modifies input element based on result
                        if (okEntry.fn(e.target.value, e)) {
                            field.classList.remove("invalid");
                            field.setCustomValidity("");
                        } else {
                            field.classList.add("invalid");
                            field.setCustomValidity(okEntry.msg);
                        }
                    },
                    false
                );
            } else {
                //Throw if the validator was not found
                throw new Error(`missing validator '${okEntryName}'`);
            }
        });
    });
};

export default ok;
