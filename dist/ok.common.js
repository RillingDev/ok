'use strict';

var lightdash = require('lightdash');

/**
 * Checks if an input is a radio or a checkbox
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {boolean}
 */
const isCheckboxLike = (element) => element.type === "checkbox" || element.type === "radio";
/**
 * Returns input element specific value
 *
 * @private
 * @param {HTMLInputElement} element
 * @returns {string|boolean}
 */
const getInputElementValue = (element) => isCheckboxLike(element) ? element.checked : element.value;
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
        this.map = lightdash.mapFromObject(validators);
    }
    validate(element, ...args) {
        const validatorKey = element.dataset.ok;
        if (!this.map.has(validatorKey)) {
            throw new Error(`missing validator '${validatorKey}'`);
        }
        const okEntry = this.map.get(validatorKey);
        if (okEntry.fn(getInputElementValue(element), element, ...args)) {
            element.classList.remove("invalid");
            element.setCustomValidity("");
            return true;
        }
        else {
            element.classList.add("invalid");
            element.setCustomValidity(okEntry.msg);
            return false;
        }
    }
    /**
     * Binds the fitting validator to an input element
     *
     * @param {HTMLInputElement} element
     */
    bind(element, eventType = "input") {
        element.addEventListener(eventType, e => this.validate(element, e));
    }
};

module.exports = Ok;
