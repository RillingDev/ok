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
const mapFromObject = (obj) => new Map(Object.entries(obj));

/**
 * Checks if an input is a radio or a checkbox
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {boolean}
 */
const isInputElementCheckboxLike = (element) => element.type === "checkbox" || element.type === "radio";
/**
 * Returns input element specific value
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {string|boolean}
 */
const getInputElementValue = (element) => isInputElementCheckboxLike(element) ? element.checked : element.value;

/**
 * @class
 */
const Ok = class {
    /**
     * Ok class
     *
     * @public
     * @param {object} validators
     * @param {string|false} [invalidClass="invalid"]
     */
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
                    element.setCustomValidity(validator.msg);
                }
            }
        });
        if (result) {
            if (this.invalidClass) {
                element.classList.remove(this.invalidClass);
            }
            element.setCustomValidity("");
        }
        else if (this.invalidClass) {
            element.classList.add(this.invalidClass);
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

export default Ok;
