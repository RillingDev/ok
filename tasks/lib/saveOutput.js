"use strict";

const fs = require("fs");

/**
 * Writes the output as file and logs
 * @param {String} path
 * @param {String} content
 * @param {String} name
 */
module.exports = function (path, content, name) {
    fs.writeFile(path, content, (err) => console.log(err || `Saved ${name}`));
};
