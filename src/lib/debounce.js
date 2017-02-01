"use strict";

/**
 * @private
 * @param {Function} fn function to debounce
 * @param {Number} wait timeout in ms
 * @param {Boolean} immediate if the debounc should be ignored
 * @returns {Function} debounced function
 */
const debounce = function(fn, wait, immediate) {
    let timeout;

    return function() {
        const context = this;
        const args = Array.from(arguments);
        const callNow = immediate && !timeout;
        const later = function() {
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

export default debounce;
