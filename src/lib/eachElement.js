/**
 * Loops over each element from querySelector
 *
 * @param {Node} context
 * @param {string} selector
 * @param {Function} fn
 */
const eachElement = (context, selector, fn) => Array.from(context.querySelectorAll(selector)).forEach(fn);

export default eachElement;
