/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	build: {
		lib: {
			entry: "./lib/main.ts",
			name: "Ok",
			fileName: "ok",
		},
	},
	plugins: [dts({ rollupTypes: true })],
	test: {
		environment: "jsdom",
		setupFiles: "./lib/test/vitest.setup.ts",
		include: ["./lib/**/*.test.{ts,tsx}"],
		coverage: {
			provider: "v8",
			reporter: ["lcovonly"],
			reportsDirectory: "./.local/coverage",
		},
	},
});
