var Ok = (function () {
    'use strict';

    /**
     * Checks if the value has any of the given types.
     * If at least one type gives back true, true is returned.
     *
     * @memberof Is
     * @since 1.0.0
     * @param {any} val Value to check.
     * @param {...string} types Type strings to compare the value to.
     * @returns {boolean} If the value has the type provided.
     * @example
     * isTypeOf("foo", "string")
     * // => true
     *
     * isTypeOf("foo", "number", "string")
     * // => true
     *
     * isTypeOf("foo", "number")
     * // => false
     */
    const isTypeOf = (val, ...types) => types.some(type => typeof val === type);

    /**
     * Checks if a value is undefined.
     *
     * @memberof Is
     * @since 1.0.0
     * @param {any} val Value to check.
     * @returns {boolean} If the value is undefined.
     * @example
     * const a = {};
     *
     * isUndefined(a.b)
     * // => true
     *
     * isUndefined(undefined)
     * // => true
     *
     * isUndefined(null)
     * // => false
     *
     * isUndefined(1)
     * // => false
     */
    const isUndefined = (val) => isTypeOf(val, "undefined");

    /**
     * Checks if a value is a function.
     *
     * @memberof Is
     * @since 1.0.0
     * @param {any} val Value to check.
     * @returns {boolean} If the value is a function.
     * @example
     * isFunction(function a(){})
     * // => true
     *
     * isFunction(Array.from)
     * // => true
     *
     * isFunction(null)
     * // => false
     */
    const isFunction = (val) => isTypeOf(val, "function");

    var Delimiters;
    (function (Delimiters) {
        Delimiters["KEBAB"] = "-";
        Delimiters["SNAKE"] = "_";
    })(Delimiters || (Delimiters = {}));

    /**
     * Creates a map from an object.
     *
     * @memberof Map
     * @since 1.0.0
     * @param {Object} obj Object to use.
     * @returns {Map} Map created from the object.
     * @example
     * mapFromObject({a: 1, b: 4, c: 5})
     * // => Map<string,number>{a: 1, b: 4, c: 5}
     */
    const mapFromObject = (obj) => new Map(Object.entries(obj));

    /**
     * Checks if an input is a radio or a checkbox.
     *
     * @private
     * @param element HTMLInputElement to check.
     * @returns if the element is checkbox-like.
     */
    const isInputElementCheckboxLike = (element) => element.type === "checkbox" || element.type === "radio";
    /**
     * Returns input element specific value.
     *
     * @private
     * @param element HTMLInputElement to get the value of.
     * @returns value of the element, either a string or a boolean.
     */
    const getInputElementValue = (element) => isInputElementCheckboxLike(element) ? element.checked : element.value;

    /**
     * Helper function to set validity status of elements.
     *
     * @private
     * @return If the current browser supports custom validity.
     */
    const browserSupportsValidation = () => 
    // eslint-disable-next-line @typescript-eslint/unbound-method
    !isUndefined(HTMLInputElement.prototype.setCustomValidity);
    /**
     * Helper function to set validity status of elements.
     *
     * @private
     * @param element HTMLInputElement to set the validity status for.
     * @param msg Validity message to add.
     */
    const setCustomValidity = (element, msg) => {
        if (browserSupportsValidation()) {
            element.setCustomValidity(msg);
        }
    };

    /**
     * Ok class.
     *
     * @class
     */
    const Ok = class {
        /**
         * Ok constructor.
         *
         * @public
         * @param {object} validators object containing the validators to use.
         * @param {string|boolean} [invalidClass="invalid"] CSS class for invalid elements, or false if none should be set.
         */
        constructor(validators, invalidClass = "invalid") {
            this.map = mapFromObject(validators);
            this.invalidClass = invalidClass;
        }
        /**
         * Validates an input element and returns the validity.
         *
         * @public
         * @param {HTMLInputElement} element HTMLInputElement to validate.
         * @param {Event?} e optional event that triggered validation.
         * @returns {boolean} current validity of the element.
         */
        validate(element, e) {
            if (!element.dataset.ok) {
                throw new Error("No validators are assigned to the element.");
            }
            const validatorList = element.dataset.ok
                .split(",")
                .map(str => str.trim());
            const value = getInputElementValue(element);
            let result = true;
            for (const validatorListEntry of validatorList) {
                if (result) {
                    if (!this.map.has(validatorListEntry)) {
                        throw new Error(`Validator '${validatorListEntry}' is not registered.`);
                    }
                    const validator = this.map.get(validatorListEntry);
                    if (!validator.fn(value, element, e)) {
                        result = false;
                        const msg = isFunction(validator.msg)
                            ? validator.msg(value, element, e)
                            : validator.msg;
                        setCustomValidity(element, msg);
                    }
                }
            }
            if (result) {
                setCustomValidity(element, "");
                if (this.invalidClass) {
                    element.classList.remove(this.invalidClass);
                }
            }
            else if (this.invalidClass) {
                element.classList.add(this.invalidClass);
            }
            return result;
        }
        /**
         * Binds an event handler to an input element.
         *
         * @public
         * @param {HTMLInputElement} element HTMLInputElement to bind.
         * @param {string} [eventType="input"] event type to bind.
         */
        bind(element, eventType = "input") {
            element.addEventListener(eventType, e => this.validate(element, e));
        }
    };

    return Ok;

}());
//# sourceMappingURL=ok.js.map
