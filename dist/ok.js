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
     * isTypeOf({}, "object")
     * // => true
     *
     * isTypeOf([], "object")
     * // => true
     *
     * isTypeOf("foo", "string")
     * // => true
     *
     * @example
     * isTypeOf("foo", "number")
     * // => false
     */
    /**
     * Creates a map from an object.
     *
     * @function mapFromObject
     * @memberof Map
     * @since 1.0.0
     * @param {Object} obj
     * @returns {Map}
     * @example
     * mapFromObject({a: 1, b: 4, c: 5})
     * // => Map<string,number>{a: 1, b: 4, c: 5}
     */


    const mapFromObject = obj => new Map(Object.entries(obj));

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
     * Ok class
     *
     * @public
     * @class
     * @param {IOkValidators} validators
     * @param {string|false} [invalidClass="invalid"]
     */


    const Ok = class {
      constructor(validators, invalidClass = "invalid") {
        this.map = mapFromObject(validators);
        this.invalidClass = invalidClass;
      }
      /**
       * Validates an input element and returns the validity
       *
       * @public
       * @param {HTMLInputElement} element
       * @param {...any[]} args
       * @returns {boolean}
       */


      validate(element, ...args) {
        if (!element.dataset.ok) {
          throw new Error("no validator assigned");
        }

        const validatorKey = element.dataset.ok;

        if (!this.map.has(validatorKey)) {
          throw new Error(`missing validator '${validatorKey}'`);
        }

        const okEntry = this.map.get(validatorKey);
        const result = okEntry.fn(getInputElementValue(element), element, ...args);

        if (result) {
          if (this.invalidClass) {
            element.classList.remove(this.invalidClass);
          }

          element.setCustomValidity("");
        } else {
          if (this.invalidClass) {
            element.classList.add(this.invalidClass);
          }

          element.setCustomValidity(okEntry.msg);
        }

        return result;
      }
      /**
       * Binds an event handler to an input element
       *
       * @public
       * @param {HTMLInputElement} element
       * @param {string} [eventType="input"]
       */


      bind(element, eventType = "input") {
        element.addEventListener(eventType, e => this.validate(element, e));
      }

    };

    return Ok;

}());
//# sourceMappingURL=ok.js.map
