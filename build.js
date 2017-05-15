"use strict";

const fs = require("fs");
const rollup = require("rollup");
const babel = require("babel-core");
const uglify = require("uglify-es");
const packageJson = require("./package.json");

const DIR_SRC = "./src/";
const DIR_DIST = "./dist/";
const DIR_DIST_FILE = DIR_DIST + packageJson.namespace.file;

rollup
    .rollup({
        entry: DIR_SRC + "main.js",
        plugins: []
    })
    .then(bundle => {
        const result_es = bundle.generate({
            format: "es"
        }).code;
        const result_cjs = bundle.generate({
            format: "cjs"
        }).code;
        const result_iife = babel.transform(bundle.generate({
            moduleName: packageJson.namespace.module,
            format: "iife"
        }).code).code;
        const result_iife_min = uglify.minify(result_iife, {
            compress: {
                dead_code: true,
                properties: true
            }
        }).code;

        fs.writeFile(`${DIR_DIST_FILE}.es.js`, result_es, (err) => console.log(err || "Saved ES file"));
        fs.writeFile(`${DIR_DIST_FILE}.common.js`, result_cjs, (err) => console.log(err || "Saved CJS file"));
        fs.writeFile(`${DIR_DIST_FILE}.js`, result_iife, (err) => console.log(err || "Saved IIFE file"));
        fs.writeFile(`${DIR_DIST_FILE}.min.js`, result_iife_min, (err) => console.log(err || "saved IIFE-min file"));
    })
    .catch(err => {
        throw err;
    });
