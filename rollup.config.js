import { rollupOptions } from "./package.json";

export default {
    input: `./dist/esm/main.js`,
    output: [
        {
            format: "iife",
            sourcemap: true,
            name: rollupOptions.moduleName,
            file: `./dist/${rollupOptions.outputName}.js`,
            globals: rollupOptions.globals,
        },
    ],
    external: rollupOptions.external,
    plugins: [],
};
