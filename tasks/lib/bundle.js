"use strict";

const rollup = require("rollup");
const saveOutput = require("./saveOutput");
const {
    DIR_SRC,
    DIR_DIST
} = require("./constants");
const packageJson = require("../../package.json");

/**
 * Bundles project with given formats
 * @param {Array} formats
 */
module.exports = function (formats) {
    rollup
        .rollup({
            entry: `${DIR_SRC}/main.js`,
            plugins: []
        })
        .catch(err => {
            throw err;
        })
        .then(bundle => {
            formats.forEach(format => {
                bundle
                    .generate({
                        moduleName: packageJson.namespace.module,
                        format: format.id
                    })
                    .catch(err => {
                        throw err;
                    })
                    .then(result => {
                        saveOutput(
                            `${DIR_DIST}/${packageJson.namespace.file}${format.file}.js`,
                            format.fn(result.code),
                            `JS:${format.name}`
                        );
                    });
            });
        });
};
