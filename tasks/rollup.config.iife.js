import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { settings } from "../package.json";

export default {
    input: `./src/${settings.input}`,
    output: [
        {
            format: "iife",
            name: settings.namespace.module,
            file: `./dist/${settings.namespace.file}.js`,
            sourcemap: true
        }
    ],
    plugins: [
        resolve(),
        typescript({
            cacheRoot: "./.cache/ts/iife"
        }),
        babel()
    ]
};
