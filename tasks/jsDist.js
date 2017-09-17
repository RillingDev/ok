"use strict";

const babel = require("babel-core");
const uglify = require("uglify-es");
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
    fn: code => babel.transform(code, {
        compact: false
    }).code
}, {
    id: "iife",
    ext: ".min",
    name: "IIFE:min",
    fn: code => uglify.minify(
        babel.transform(code, {
            compact: false
        }).code
    ).code
}], []);
