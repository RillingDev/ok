// File is named "_index.ts" to avoid it being treated as a module index file.

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

const browserSupportsValidation = () => !isUndefined(HTMLInputElement.prototype.setCustomValidity);

/**
 * Checks if an input is a radio or a checkbox.
 *
 * @private
 * @param {HTMLInputElement} element HTMLInputElement to check.
 * @returns {boolean} if the element is checkbox-like.
 */
const isInputElementCheckboxLike = (element) => element.type === "checkbox" || element.type === "radio";

/**
 * Returns input element specific value.
 *
 * @private
 * @param {HTMLInputElement} element HTMLInputElement to get the value of.
 * @returns {string|boolean} value of the element, either a string or a boolean.
 */
const getInputElementValue = (element) => isInputElementCheckboxLike(element) ? element.checked : element.value;

/**
 * @class
 */
const Ok = class {
    /**
     * Ok class.
     *
     * @public
     * @param {object} validators object containing the validators to use.
     * @param {string|false} [invalidClass="invalid"] CSS class for invalid elements, or false if none should be set.
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
     * @param {...any[]} args optional arguments to pass.
     * @returns {boolean} current validity of the element.
     */
    validate(element, ...args) {
        if (!element.dataset.ok) {
            throw new Error("no validator assigned");
        }
        const value = getInputElementValue(element);
        const validatorList = element.dataset.ok
            .split(",")
            .map(str => str.trim());
        let result = true;
        validatorList.forEach(validatorListEntry => {
            if (result) {
                if (!this.map.has(validatorListEntry)) {
                    throw new Error(`missing validator '${validatorListEntry}'`);
                }
                const validator = this.map.get(validatorListEntry);
                if (!validator.fn(value, element, ...args)) {
                    result = false;
                    if (browserSupportsValidation()) {
                        element.setCustomValidity(validator.msg);
                    }
                }
            }
        });
        if (result) {
            if (browserSupportsValidation()) {
                element.setCustomValidity("");
            }
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

export default Ok;
