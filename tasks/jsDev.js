"use strict";

const bundle = require("./lib/bundle");
const resolve = require("rollup-plugin-node-resolve");

bundle([{
    type: "es",
    ext: ".esm",
}, {
    type: "cjs",
    ext: ".common",
}, {
    type: "iife",
    ext: "",
}], [
    resolve()
]);
