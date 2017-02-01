const DOM_EVENT_TIMEOUT = 20; //event timeout in ms
const DOM_ATTR = "ok";
const DOM_ATTR_DATA = `[data-${DOM_ATTR}]`;
const DOM_CLASS_INVALID = "invalid";
const DOM_EVENT_INPUT = "input";

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
        const args = Array.from(arguments);
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
const Ok = function (cfg) {
    const $context = document.querySelectorAll(cfg.el);
    const timeout = cfg.timeout || DOM_EVENT_TIMEOUT;
    const invalidClass = cfg.invalidClass || DOM_CLASS_INVALID;

    //Iterates over every form
    Array.from($context).forEach(form => {
        const fields = Array.from(form.querySelectorAll(DOM_ATTR_DATA));

        //Iterates over every input with the data-attrib
        fields.forEach(field => {
            const okMethodName = field.dataset[DOM_ATTR];
            const okMethod = cfg.methods[okMethodName];

            //Check if the given validator exists
            if (typeof okMethod === "function") {
                //Validator event
                const eventFn = function (val) {
                    const result = okMethod(val);

                    //Toggle class
                    if (result) {
                        field.classList.remove(invalidClass);
                    } else {
                        field.classList.add(invalidClass);
                    }
                };
                //Debounce validator to avoid lag
                const debouncedEventFn = debounce(eventFn, timeout);

                //attach listener
                field.addEventListener(DOM_EVENT_INPUT, ev => {
                    debouncedEventFn(ev.target.value, ev);
                }, false);
            } else {
                //Throw if now validator was found
                throw new Error(`validator '${okMethodName}' missing`);
            }
        });
    });
};

export default Ok;
