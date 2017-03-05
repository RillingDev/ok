"use strict";

/**
 * Returns "normal" array from query selector
 * @param {Node} context
 * @param {String} selector
 * @returns {Array}
 */
const arrFromSelectorQuery = (context, selector) => Array.from(context.querySelectorAll(selector));

export default arrFromSelectorQuery;
