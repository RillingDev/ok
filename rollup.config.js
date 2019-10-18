import resolve from "rollup-plugin-node-resolve";
import { rollupOptions } from "./package.json";

export default {
    input: `./dist/esm/src/main.js`,
    output: [{
        format: "iife",
        sourcemap: true,
        name: rollupOptions.moduleName,
        file: `./dist/${rollupOptions.outputName}.js`,
        globals: rollupOptions.globals
    }, {
        format: "cjs",
        sourcemap: true,
        name: rollupOptions.moduleName,
        file: `./dist/${rollupOptions.outputName}.common.js`
    }],
    external: rollupOptions.external,
    plugins: [
        resolve()
    ]
};
