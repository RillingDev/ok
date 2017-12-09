"use strict";

const bundle = require("./lib/bundle");
const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const uglify = require("rollup-plugin-uglify-es");
const targets = require("../package.json").constants.js.targets;

const options_babel = {
    presets: [
        ["env", {
            modules: false,
            targets,
        }]
    ],
    plugins: [
        "external-helpers"
    ]
};

bundle([{
    type: "es",
    ext: ".esm",
}, {
    type: "cjs",
    ext: ".common",
}], [
    resolve()
]);

bundle([{
    type: "iife",
    ext: "",
}], [
    resolve(),
    babel(options_babel),
]);

bundle([{
    type: "iife",
    ext: ".min",
}], [
    resolve(),
    babel(options_babel),
    uglify()
]);
