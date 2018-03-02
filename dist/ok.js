var Ok = (function () {
'use strict';

/**
 * Checks if the value has a certain type-string.
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
const _Object = Object;
const _Map = Map;
/**
 * Returns an array of the objects entries.
 *
 * `Object.entries` shorthand.
 *
 * @function objEntries
 * @memberof Object
 * @since 1.0.0
 * @param {Object} obj
 * @returns {any[]} Array<[key: any, val: any]>]
 * @example
 * // returns [["a", 1], ["b", 2], ["c", 3]]
 * objEntries({a: 1, b: 2, c: 3})
 */


const objEntries = _Object.entries;
/**
 * Creates a map from an object.
 *
 * @function mapFromObject
 * @memberof Map
 * @since 1.0.0
 * @param {Object} obj
 * @returns {Map}
 * @example
 * // returns Map{a: 1, b: 4, c: 5}
 * mapFromObject({a: 1, b: 4, c: 5})
 */

const mapFromObject = obj => new _Map(objEntries(obj));

/**
 * Checks if an input is a radio or a checkbox
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {boolean}
 */

const isCheckboxLike = element => element.type === "checkbox" || element.type === "radio";
/**
 * Returns input element specific value
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {string|boolean}
 */


const getInputElementValue = element => isCheckboxLike(element) ? element.checked : element.value;
/**
 * Ok main class
 *
 * @class
 */


const Ok = class {
  /**
   * Creates a new ok instance
   *
   * @constructor
   * @param {IOkValidators} validators
   */
  constructor(validators) {
    this.map = mapFromObject(validators);
  }
  /**
   * Binds the fitting validator to an input element
   *
   * @param {HTMLInputElement} element
   */


  bind(element) {
    const validatorKey = element.dataset.ok;

    if (!this.map.has(validatorKey)) {
      throw new Error(`missing validator '${validatorKey}'`);
    }

    const okEntry = this.map.get(validatorKey);
    element.addEventListener("input", e => {
      if (okEntry.fn(getInputElementValue(e.target), e)) {
        element.classList.remove("invalid");
        element.setCustomValidity("");
      } else {
        element.classList.add("invalid");
        element.setCustomValidity(okEntry.msg);
      }
    });
  }

};

return Ok;

}());
//# sourceMappingURL=ok.js.map
