/* eslint-env node */
module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
	],
	ignorePatterns: ["dist/", "docs/", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["./tsconfig.json", "./tsconfig.node.json"],
	},
	plugins: ["prettier"],
	rules: {
		/*
		 * Prettier
		 */
		"prettier/prettier": "warn",
	},
};
