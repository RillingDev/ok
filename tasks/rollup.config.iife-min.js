import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify-es";
import { settings } from "../package.json";

export default {
    input: `./src/main.ts`,
    output: [
        {
            format: "iife",
            name: settings.namespace.module,
            file: `./dist/${settings.namespace.file}.min.js`,
            sourcemap: true
        }
    ],
    plugins: [
        resolve(),
        typescript({
            cacheRoot: "./.cache/ts/iife-min"
        }),
        uglify()
    ]
};
