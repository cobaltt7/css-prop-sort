"use strict";

/** @file ESLint Configuration file. */

module.exports = {
	env: { node: true },

	extends: ["plugin:@onedotprojects/recommended"],

	ignorePatterns: ["*.ts", "**.ts"],

	overrides: [
		{
			extends: ["plugin:@onedotprojects/esm"],
			files: ["*.js", "**.js", "*.mjs", "**.mjs"],
		},
		{
			extends: ["plugin:@onedotprojects/config"],
			files: ["bin/**.js", "bin/*.js", ".github/workflows/*.js"],

			rules: { "no-console": 0 },
		},
		{
			extends: ["plugin:@onedotprojects/config"],
			files: [".eslintrc.cjs", "src/config.default.js"],
		},
		{
			files: [".github/workflows/*.js"],

			rules: {
				"import/no-extraneous-dependencies": [
					2,
					{
						bundledDependencies: false,
						devDependencies: true,
						optionalDependencies: false,
						peerDependencies: false,
					},
				],
			},
		},
	],

	parserOptions: { ecmaVersion: 2015 },
	rules: { "fp/no-throw": 0, "no-console": 2 },
};
