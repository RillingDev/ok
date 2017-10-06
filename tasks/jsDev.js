"use strict";

const bundle = require("./lib/bundle");
const resolve = require("rollup-plugin-node-resolve");

bundle([{
    id: "es",
    ext: ".esm",
    name: "ES",
}, {
    id: "cjs",
    ext: ".common",
    name: "CommonJS",
}, {
    id: "iife",
    ext: "",
    name: "IIFE",
}], [
    resolve()
]);
