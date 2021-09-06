/** @file Sort CSS properties. */

import { propertiesToCss, sortProperties, parseProperties } from "./parsing.js";
import { replaceAll } from "./utils.js";

/**
 * Replace all generated comments denoting group boundries.
 *
 * @param {string} css - The CSS to replace group comments in.
 * @param {import("../types").RawConfig} config - The configuration to use.
 *
 * @returns {string} - The CSS without group comments.
 */
function removeGroupComments(css, config) {
	/** @type {import("../types").ConfigTypes.groups} */
	const groups = [...config.groups.slice(1), [config.defaultGroup, []]];

	return groups.reduce(
		(partiallyReplacedCss, group) =>
			replaceAll(partiallyReplacedCss, config.comment(group[0],config).trim(), ""),
		css,
	);
}

/**
 * Sort CSS properties.
 *
 * @param {string} css - The CSS to sort.
 * @param {import("../types").RawConfig} config - The configuration to use.
 *
 * @returns {Promise<string>} - The sorted CSS.
 */
export default async function sortCssProperties(css, config) {
	return removeGroupComments(css, config).replace(
		/(?<={)(?:(?:\/\*.*\*\/)*\s*[_a-z-]+\s*:(?:\\"|\\'|[^"';}]|(?<quote>(?<!\\)(?:\\\\)*["']).*\k<quote>[^;]*)+;?\s*)+/gi,
		(rule) => propertiesToCss(sortProperties(parseProperties(rule, config), config), config),
	);
}
