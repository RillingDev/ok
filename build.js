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
        const result = {
            es: bundle.generate({
                format: "es"
            }),
            cjs: bundle.generate({
                format: "cjs"
            }),
            iife: babel.transform(bundle.generate({
                moduleName: packageJson.namespace.module,
                format: "iife"
            }).code),
            iife_min: null
        };


        fs.writeFileSync(`${DIR_DIST_FILE}.es.js`, result.es.code);
        fs.writeFileSync(`${DIR_DIST_FILE}.common.js`, result.cjs.code);
        fs.writeFileSync(`${DIR_DIST_FILE}.js`, result.iife.code);

        result.iife_min = uglify.minify(`${DIR_DIST_FILE}.js`);

        fs.writeFileSync(`${DIR_DIST_FILE}.min.js`, result.iife_min.code);
    });
