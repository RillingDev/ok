/**
 * Checks if the value has a certain type-string
 *
 * @function isTypeOf
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @param {string} type
 * @returns {boolean}
 * @example
 * // returns true
 * isTypeOf({}, "object")
 * isTypeOf([], "object")
 * isTypeOf("foo", "string")
 *
 * @example
 * // returns false
 * isTypeOf("foo", "number")
 */
/**
 * Iterates over each element in an array
 *
 * Wrapper around arr.forEach to have a cleaner API and better minified code
 *
 * @function forEach
 * @memberof For
 * @param {any[]} arr
 * @param {function} fn fn(val: any, index: number, arr: any[])
 * @example
 * // returns a = [0, 2, 6]
 * const a = [1, 2, 3];
 *
 * forEach(a, (val, index)=>a[index] = val * index)
 */
const forEach = (arr, fn) => arr.forEach(fn);

/**
 * Creates a new array with the values of the input iterable
 *
 * `Array.from` shorthand
 *
 * @function arrFrom
 * @memberof Array
 * @since 1.0.0
 * @param {any} arr
 * @returns {any[]}
 * @example
 * // returns a = [1, 2, 3], b = [1, 10, 3]
 * const a = [1, 2, 3];
 * const b = arrFrom(a);
 *
 * b[1] = 10;
 */
const arrFrom = Array.from;

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
    forEachElement(document, cfg.el, form => {
        forEachElement(form, "[data-ok]", field => {
            const okEntryName = field.dataset["ok"];
            const okEntry = cfg.validators[okEntryName];

            if (okEntry) {
                field.addEventListener(
                    "input",
                    e => {
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
                throw new Error(`missing validator '${okEntryName}'`);
            }
        });
    });
};

export default ok;
