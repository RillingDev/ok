import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
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
