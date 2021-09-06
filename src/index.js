/** @file Sort CSS properties. */

import { propertiesToCss, sortProperties, parseProperties } from "./parsing.js";

/**
 * Sort CSS properties.
 *
 * @param {string} css - The CSS to sort.
 * @param {import("../types").RawConfig} config - The configuration to use.
 *
 * @returns {Promise<string>} - The sorted CSS.
 */
export default async function sortCssProperties(css, config) {
	return css.replace(
		/(?<={)(?:\s*[_a-z-]+\s*:(?:\\".*\\"|[^";}]|(?<!\\)"(?:(?:[^"]|[^\\]")*?[^\\])?")+;?)+/gi,
		(rule) => propertiesToCss(sortProperties(parseProperties(rule, config), config), config),
	);
}
