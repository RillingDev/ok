import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import { settings } from "../package.json";

export default {
    input: "spec/main.ts",
    output: {
        format: "cjs",
        file: `./spec/out/main.spec.js`
    },
    external: settings.external,
    plugins: [
        resolve(),
        typescript({
            cacheRoot: "./.cache/ts/test"
        })
    ]
};
