export default {
    input: `./dist/esm/main.js`,
    output: [
        {
            format: "module",
            sourcemap: true,
            name: "ok",
            file: `./demo/dist/ok.esm.js`
        },
    ],
    plugins: [],
};
