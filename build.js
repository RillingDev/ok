"use strict";

const fs = require("fs");
const rollup = require("rollup");
const babel = require("babel-core");
const uglify = require("uglify-js");
const packageJson = require("./package.json");

const DIR_SRC = "./src/";
const DIR_DIST = "./dist/";
const DIR_DIST_FILE = DIR_DIST + packageJson.namespace.file;

rollup
    .rollup({
        entry: DIR_SRC + "main.js",
    })
    .then(bundle => {
        const result = {};

        result.es = bundle.generate({
            format: "es"
        }).code;

        result.cjs = bundle.generate({
            format: "cjs"
        }).code;

        result.iife = babel.transform(bundle.generate({
            moduleName: packageJson.namespace.module,
            format: "iife"
        }).code).code;

        result.iife_min = uglify.minify(result.iife, {
            fromString: true,
            compress: {
                unsafe: true
            },
        }).code;


        fs.writeFileSync(`${DIR_DIST_FILE}.es.js`, result.es);
        fs.writeFileSync(`${DIR_DIST_FILE}.common.js`, result.cjs);
        fs.writeFileSync(`${DIR_DIST_FILE}.js`, result.iife);
        fs.writeFileSync(`${DIR_DIST_FILE}.min.js`, result.iife_min);
    });
