const DOM_EVENT_TIMEOUT = 20; //event timeout in ms
const DOM_ATTR = "ok";
const DOM_ATTR_DATA = `[data-${DOM_ATTR}]`;
const DOM_EVENT_INPUT = "input";

const toArray = val => Array.from(val);

/**
 * Debounces a function to only be executable every x ms
 *
 * @private
 * @param {Function} fn function to debounce
 * @param {Number} wait timeout in ms
 * @returns {Function} debounced function
 */
const debounce = function (fn, wait) {
    let timeout;

    return function () {
        const context = this;
        const args = toArray(arguments);
        const callNow = !timeout;
        const later = function () {
            timeout = null;
            fn.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            fn.apply(context, args);
        }
    };
};

/**
 * Applies Ok to all given forms
 *
 * @param {Object} cfg Configuration object
 */
const ok = function (cfg) {
    const $timeout = cfg.timeout || DOM_EVENT_TIMEOUT;

    //Collect all inputs
    toArray(document.querySelectorAll(cfg.el)).forEach(form => {
        const fields = toArray(form.querySelectorAll(DOM_ATTR_DATA));

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

export default ok;
