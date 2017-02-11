"use strict";

import toArray from "./toArray";

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

export default debounce;
