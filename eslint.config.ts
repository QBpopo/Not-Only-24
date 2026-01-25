import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},
	tseslint.configs.recommended,
	{
		files: ["**/*.{ts,mts,cts}"],
		rules: {
			"@typescript-eslint/array-type": "warn",
			"@typescript-eslint/ban-tslint-comment": "error",
			"@typescript-eslint/no-explicit-any": "warn",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					args: "all",
					argsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					ignoreRestSiblings: true,
				},
			],
		},
	},
	stylistic.configs.recommended,
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: { "@stylistic": stylistic },
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			"@stylistic/arrow-parens": ["warn", "as-needed"],
			"@stylistic/brace-style": ["warn", "1tbs", { allowSingleLine: true }],
			"@stylistic/comma-dangle": ["warn", "always-multiline"],
			"@stylistic/dot-location": ["warn", "property"],
			"@stylistic/eol-last": ["warn", "always"],
			"@stylistic/generator-star-spacing": ["warn", "after"],
			"@stylistic/indent": ["warn", "tab", { SwitchCase: 1 }],
			"@stylistic/indent-binary-ops": ["warn", "tab"],
			"@stylistic/max-len": "off",
			"@stylistic/member-delimiter-style": ["warn", {
				multiline: {
					delimiter: "semi",
					requireLast: true,
				},
			}],
			"@stylistic/multiline-ternary": ["warn", "always-multiline"],
			"@stylistic/no-extra-parens": ["warn", "all", { nestedBinaryExpressions: false }],
			"@stylistic/no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
			"@stylistic/no-multiple-empty-lines": ["error", { max: 2, maxBOF: 1, maxEOF: 1 }],
			"@stylistic/no-tabs": ["off", { allowIndentationTabs: true }],
			"@stylistic/nonblock-statement-body-position": ["warn", "beside"],
			"@stylistic/object-curly-newline": ["warn", { multiline: true }],
			"@stylistic/object-curly-spacing": ["warn", "always"],
			"@stylistic/object-property-newline": ["warn", { allowAllPropertiesOnSameLine: true }],
			"@stylistic/one-var-declaration-per-line": ["warn", "initializations"],
			"@stylistic/operator-linebreak": ["warn", "before", { overrides: { "?": "after" } }],
			"@stylistic/padded-blocks": ["warn", "never"],
			"@stylistic/quote-props": ["warn", "consistent-as-needed"],
			"@stylistic/quotes": ["warn", "double", { avoidEscape: true }],
			"@stylistic/rest-spread-spacing": ["warn", "never"],
			"@stylistic/semi": ["warn", "always"],
			"semi-spacing": ["warn", { before: false, after: true }],
			"semi-style": ["warn", "last"],
			"@stylistic/space-before-blocks": ["warn", "always"],
			"@stylistic/space-before-function-paren": [
				"warn",
				{ anonymous: "never", named: "never", asyncArrow: "always", catch: "always" },
			],
			"@stylistic/space-in-parens": ["warn", "never"],
			"@stylistic/switch-colon-spacing": ["warn", { after: true, before: false }],
			"@stylistic/template-curly-spacing": ["warn", "never"],
			"@stylistic/template-tag-spacing": ["warn", "never"],
			"@stylistic/wrap-iife": ["warn", "inside", { functionPrototypeMethods: true }],
			"@stylistic/wrap-regex": "off",
			"@stylistic/yield-star-spacing": ["warn", "after"],
		},
	},
]);
