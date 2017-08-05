"use strict";

const bundle = require("./lib/bundle");

bundle([{
    id: "es",
    file: ".esm",
    name: "ES",
    fn: code => code
}, {
    id: "cjs",
    file: ".common",
    name: "CommonJS",
    fn: code => code
}, {
    id: "iife",
    file: "",
    name: "IIFE",
    fn: code => code
}]);
