import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify-es";
import { settings } from "../package.json";

export default {
    input: `./src/${settings.input}`,
    output: [
        {
            format: "iife",
            name: settings.namespace.module,
            file: `./dist/${settings.namespace.file}.min.js`,
            sourcemap: true
        }
    ],
    plugins: [
        json(),
        resolve(),
        typescript({
            cacheRoot: "./.cache/ts/iife-min"
        }),
        babel(),
        uglify()
    ]
};
