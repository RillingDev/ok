import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { settings } from "../package.json";

export default {
    input: `./src/${settings.input}`,
    output: [
        {
            format: "es",
            file: `./dist/${settings.namespace.file}.esm.js`
        },
        {
            format: "cjs",
            file: `./dist/${settings.namespace.file}.common.js`
        }
    ],
    external: settings.external,
    plugins: [
        json(),
        resolve(),
        typescript({
            cacheRoot: "./.cache/ts/main",
            tsconfigOverride: {
                compilerOptions: {
                    declaration: true,
                    declarationDir: "./types"
                }
            },
            useTsconfigDeclarationDir: true
        })
    ]
};
