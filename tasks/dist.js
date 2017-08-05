"use strict";

const babel = require("babel-core");
const uglify = require("uglify-es");
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
    fn: code => babel.transform(code, {
        compact: false
    }).code
}, {
    id: "iife",
    file: ".min",
    name: "IIFE:min",
    fn: code => uglify.minify(
        babel.transform(code, {
            compact: false
        }).code
    ).code
}]);
