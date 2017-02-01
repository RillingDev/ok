"use strict";

const fs = require("fs");
const rollup = require("rollup");
const babel = require("babel-core");
const uglify = require("uglify-js");

const packageJson = require("./package.json");

const DIR_SRC = "./src/";
const DIR_DIST = "./dist/";
const outputPath = DIR_DIST + packageJson.namespace.file;

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


        fs.writeFileSync(`${outputPath}.es.js`, result.es.code);
        fs.writeFileSync(`${outputPath}.common.js`, result.cjs.code);
        fs.writeFileSync(`${outputPath}.js`, result.iife.code);

        result.iife_min = uglify.minify(`${outputPath}.js`);

        fs.writeFileSync(`${outputPath}.min.js`, result.iife_min.code);
    });
