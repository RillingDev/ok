"use strict";

const bundle = require("./lib/bundle");

bundle([{
    id: "es",
    ext: ".esm",
    name: "ES",
    fn: code => code
}, {
    id: "cjs",
    ext: ".common",
    name: "CommonJS",
    fn: code => code
}, {
    id: "iife",
    ext: "",
    name: "IIFE",
    fn: code => code
}], []);
