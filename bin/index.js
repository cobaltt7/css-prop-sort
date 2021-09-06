#!/usr/bin/env node

/** @file CLI To bulk sort CSS properties. */

import { readFileSync as readFile, writeFileSync as writeFile } from "fs";
import path from "path";

import findUp from "find-up";
import { sync as globby } from "globby";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import generateConfig from "../src/config.js";
import sortCssProperties from "../src/index.js";

const argv = yargs(hideBin(process.argv))
		.normalize("config")
		.options({
			config: {
				alias: "c",
				describe: "Path to the configuaration file",
				nargs: 1,
				normalize: true,
				type: "string",
			},
		})
		.scriptName("css-prop-sort")
		.parse(),
	{ _: globs, config: configFile } = argv;

/**
 * Load a JSON or JS file from a path.
 *
 * @param {string} fileName - The file to load from.
 *
 * @returns {any | Promise<any>} - The loaded file.
 * @throws {ReferenceError} - If the filetype is unsupported.
 */
function loadJsonOrJs(fileName) {
	switch (path.extname(fileName)) {
		case ".json":
			return JSON.parse(readFile(fileName, "utf8"));
		case ".js":
		case ".mjs":
		case ".cjs":
			return import(fileName);

		default:
			yargs.showHelp("error");

			throw new ReferenceError(`Unsupported config file type: ${path.extname(fileName)}`);
	}
}

/**
 * Look up the file tree for a file by name.
 *
 * @param {string} file - File name to look for and load.
 *
 * @returns {any | undefined | Promise<any>} - The loaded file.
 */
function loadFileByFileName(file) {
	const configPath = findUp.sync(file, {
			allowSymlinks: false,
		}),
		nothing = undefined;

	if (configPath) {
		try {
			return loadJsonOrJs(file);
		} catch {}
	}

	return nothing;
}

/** CLI entry point. */
async function main() {
	const CONFIG = await generateConfig(
		configFile
			? await loadJsonOrJs(path.resolve(process.cwd(), configFile))
			: loadFileByFileName("package.json")?.cssPropSort ||
					loadFileByFileName("cssPropSort.config.json") ||
					(await loadFileByFileName("cssPropSort.config.js")) ||
					(await loadFileByFileName("cssPropSort.config.cjs")) ||
					(await loadFileByFileName("cssPropSort.config.mjs")) ||
					{},
	);

	for (const filePath of globby(globs?.length ? globs.map((value) => `${value}`) : "**.css", {
		// Overritable properties
		dot: true,
		gitignore: true,

		...CONFIG.glob,

		// Non-overritable properties
		absolute: true,
		markDirectories: true,
		objectMode: false,
		onlyDirectories: false,
		onlyFiles: true,
		stats: false,
		unique: true,
	})) {
		const css = readFile(filePath, "utf8");

		sortCssProperties(css, CONFIG)
			.then((sortedCss) => writeFile(filePath, sortedCss, "utf8"))
			.catch((error) => {
				yargs.showHelp("error");

				throw new Error(error);
			});
	}
}

main();