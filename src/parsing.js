/**
 * @file Parsing Utils.
 * @typedef {{ group: string; property: string; value: string }} property
 */

import * as propertyUtil from "./properties.js";

/**
 * Convert an object entry to an objects of metadata.
 *
 * @param {[string, string]} arg0 - The object entry.
 * @param {import("../types").RawConfig} config - The configuration to use.
 *
 * @returns {property} - The array of objects.
 */
function ruleEntryToObject([property, value], config) {
	return {
		group: propertyUtil.getGroup(property, config),
		property,
		value,
	};
}

/**
 * Find all properties.
 *
 * @param {string} rule - The input css rule.
 * @param {import("../types").RawConfig} config - The configuration to use.
 *
 * @returns {property[]} - The properties.
 */
export function parseProperties(rule, config) {
	return (
		rule
			.replace(/;\s*$/, "")
			.match(/[^;]*(?<quote>(?<!\\)(?:\\\\)*["']).*\k<quote>[^;]*|[^;]+/gsu) || []
	).map((line) =>
		ruleEntryToObject(
			// @ts-expect-error -- The regex ensures the string is only split once, so the resulting array must have exatly 2 items.
			line
				// Condence whitespace
				.replace(/\s/g, " ")
				// Split into property name and value
				.split(/(?<=^[^:]+):/)
				.map((properyOrValue) =>
					// Trim whitespace
					properyOrValue.trim(),
				),
			config,
		),
	);
}

/**
 * Sort properties.
 *
 * @param {property[]} properties - The properties to sort.
 * @param {import("../types").RawConfig} config - The configuration to use.
 *
 * @returns {property[]} - The sorted properties.
 */
export function sortProperties(properties, config) {
	return properties.sort(({ property: previous }, { property: next }) => {
		const nextIndex = propertyUtil.getIndex(next, config),
			previousIndex = propertyUtil.getIndex(previous, config);

		if (previousIndex === nextIndex) {
			// Sort alphabetically.
			return previous < next ? -1 : previous > next ? 1 : 0;
		}

		return previousIndex - nextIndex;
	});
}

/**
 * Convert properties to a CSS string.
 *
 * @param {property[]} properties - The input properties.
 * @param {import("../types").RawConfig} config - The configuration to use.
 *
 * @returns {string} - The CSS string.
 */
export function propertiesToCss(properties, config) {
	return properties
		.map(
			(property, index, array) =>
				`${
					property.group === array[index - 1]?.group
						? ""
						: `${config.comment(property.group)}\n`
				}${property.property}: ${property.value};\n`,
		)
		.join("")
		.trim();
}
