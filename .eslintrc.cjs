/* eslint-env node */
module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["./tsconfig.json", "./tsconfig.node.json"]
	},
	plugins: ["@typescript-eslint", "prettier"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
	],
	ignorePatterns: ["dist/", "docs/", ".eslintrc.cjs"],
	rules: {
		/*
		 * ESLint
		 */
		// Error prevention
		"array-callback-return": "warn",
		"consistent-return": "warn",
		"no-constructor-return": "warn",
		"no-implicit-coercion": "warn",
		"no-promise-executor-return": "error",
		"no-template-curly-in-string": "warn",
		"no-unreachable-loop": "warn",
		"require-atomic-updates": "warn",
		/*
		 * Prettier
		 */
		"prettier/prettier": "warn",
		/*
		 * Typescript
		 */
		// Enforce consistency
		"@typescript-eslint/consistent-type-imports": "warn",
		"@typescript-eslint/explicit-function-return-type": [
			"warn",
			{
				allowExpressions: true,
			},
		],
		"@typescript-eslint/method-signature-style": "warn",
		"@typescript-eslint/naming-convention": [
			"warn",
			{
				selector: "default",
				format: ["strictCamelCase"],
				leadingUnderscore: "allow",
				trailingUnderscore: "forbid",
			},
			{
				selector: "variable",
				format: ["strictCamelCase", "StrictPascalCase", "UPPER_CASE"],
			},
			{
				selector: "property",
				format: ["strictCamelCase", "StrictPascalCase", "UPPER_CASE"],
			},
			{
				selector: "typeAlias",
				format: ["StrictPascalCase"],
			},
			{
				selector: "typeParameter",
				format: ["PascalCase"],
				// Allow "T", "TValue", "Value" and such
			},
			{
				selector: "interface",
				format: ["StrictPascalCase"],
				custom: {
					regex: "^I[A-Z]",
					match: false,
				},
			},
			{
				selector: "class",
				format: ["StrictPascalCase"],
			},
			{
				selector: "enum",
				format: ["StrictPascalCase"],
			},
			{
				selector: "enumMember",
				format: ["UPPER_CASE"],
			},
		],
		// Prevents bugs
		"@typescript-eslint/no-redeclare": "error",
		"@typescript-eslint/no-shadow": "warn",
		"@typescript-eslint/strict-boolean-expressions": "warn",
		// Safer default
		"@typescript-eslint/prefer-readonly": "warn",
		// Essential when working with maps
		"@typescript-eslint/no-non-null-assertion": "off",
	},
};
