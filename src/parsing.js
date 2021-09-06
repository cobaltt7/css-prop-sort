/**
 * @file Parsing Utils.
 * @typedef {{ comment: string; group: string; property: string; value: string }} property
 */

import * as propertyUtil from "./properties.js";

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
		(
			rule
				// Condence whitespace
				.replace(/\s/g, " ")
				.match(/[^;]*(?<quote>(?<!\\)(?:\\\\)*["']).*\k<quote>[^;]*|[^;]+/gsu) || []
		).reduce((/** @type {property[]} */accumulated,line) => {
			/** @type {{ comment: string; property: string; value: string }|undefined} */
			// @ts-expect-error -- TS doesn't know what groups the RegExp will output.
			const propertyMetadata =
				line
					// Split into comment, property, and value
					.match(
						/(?<comment>(?:\/\*.*\*\/\s*)*)(?<property>[_a-z-]+)\s*:\s*(?<value>(?:\\".*\\"|[^";}]|(?<!\\)"(?:(?:[^"]|[^\\]")*?[^\\])?")+)/i,
					)?.groups;

			if(!propertyMetadata) return accumulated

			return [...accumulated, {
				comment: propertyMetadata.comment,
				group: propertyUtil.getGroup(propertyMetadata.property, config),
				property: propertyMetadata.property,
				value: propertyMetadata.value,
			}];
		},
			[])
	)
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
				}${property.comment ? `${property.comment}\n` : property.comment}${
					property.property
				}:${property.value};\n`,
		)
		.join("")
		.trim();
}
