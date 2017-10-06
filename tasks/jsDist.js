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
    id: "es",
    ext: ".esm",
    name: "ES",
}, {
    id: "cjs",
    ext: ".common",
    name: "CommonJS",
}], [
    resolve()
]);

bundle([{
    id: "iife",
    ext: "",
    name: "IIFE",
}], [
    resolve(),
    babel(options_babel),
]);

bundle([{
    id: "iife",
    ext: ".min",
    name: "IIFE:min",
}], [
    resolve(),
    babel(options_babel),
    uglify()
]);
