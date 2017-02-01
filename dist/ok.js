var Ok = function () {
    'use strict';

    const DOM_EVENT_TIMEOUT = 20; //event timeout in ms
    const DOM_ATTR = "ok";
    const DOM_ATTR_DATA = `[data-${DOM_ATTR}]`;
    const DOM_CLASS_INVALID = "invalid";
    const DOM_EVENT_INPUT = "input";

    /**
     * @private
     * @param {Function} fn function to debounce
     * @param {Number} wait timeout in ms
     * @param {Boolean} immediate if the debounc should be ignored
     * @returns {Function} debounced function
     */
    const debounce = function (fn, wait, immediate) {
        let timeout;

        return function () {
            const context = this;
            const args = Array.from(arguments);
            const callNow = immediate && !timeout;
            const later = function () {
                timeout = null;
                if (!immediate) {
                    fn.apply(context, args);
                }
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                fn.apply(context, args);
            }
        };
    };

    /**
     * Binds validator function to input
     *
     * @private
     * @param {Node} field Input Node
     * @param {Object} methods method container
     * @param {Number} timeout event tiemout
     * @param {String} invalidClass class to add to invalid input fields
     */
    const bindValidator = function (field, methods, timeout, invalidClass) {
        const okMethodName = field.dataset[DOM_ATTR];
        const okMethod = methods[okMethodName];

        if (typeof okMethod === "function") {
            const debouncedValidator = debounce(val => {
                const result = okMethod(val);

                if (result) {
                    field.classList.remove(invalidClass);
                } else {
                    field.classList.add(invalidClass);
                }
            }, timeout);

            field.addEventListener(DOM_EVENT_INPUT, ev => {
                debouncedValidator(ev.target.value, ev);
            }, false);
        } else {
            throw new Error(`validator '${okMethodName}' missing`);
        }
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

        //Binds on each input that has the attribute
        Array.from($context).forEach(form => {
            const fields = Array.from(form.querySelectorAll(DOM_ATTR_DATA));

            fields.forEach(field => {
                bindValidator(field, methods, timeout, invalidClass);
            });
        });
    };

    return Ok;
}();