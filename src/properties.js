/** @file Property Utils. */

import { findLastIndex, replaceAll } from "./utils.js";

/**
 * Determines whether a property matches a string potentially containing a wildcard.
 *
 * @param {string} property - The property to match.
 * @param {string} stringToMatch - The string to match against.
 * @param {import("../types").RawConfigTypes.wildcard} [wildcard] - An optional wildcard to expand
 *   in `stringToMatch`.
 *
 * @returns {boolean} - Whether the property matches.
 */
function matches(property, stringToMatch, wildcard) {
	return new RegExp(
		`^${/(?:-.+-)?/.source}${(wildcard
			? replaceAll(stringToMatch, wildcard, ".*")
			: stringToMatch
		)
			// Escape dashes
			// (That isn't the only character that needs escaping in regex, but it's the only one that's also allowed in prop names)
			.replace(/-/g, "\\-")}$`,
		"i",
	).test(property);
}

/**
 * Find the group a property is in.
 *
 * @param {string} propertyToFind - The property to find.
 * @param {import("../types").RawConfig} CONFIG - The configuration to use.
 *
 * @returns {string} - The group.
 */
export function getGroup(propertyToFind, CONFIG) {
	const returnValue = CONFIG.groups.find(([, properties]) => {
		// Impossible but we need to satisify TS.
		if (typeof properties === "string") return false;

		return properties.some((propertyToMatch) =>
			matches(propertyToFind, propertyToMatch, CONFIG.wildcard),
		);
	})?.[0];

	return typeof returnValue === "string" ? returnValue : CONFIG.defaultGroup;
}

/**
 * Find the index of a property by name.
 *
 * @param {string} propertyToFind - The property to find.
 * @param {import("../types").RawConfig} CONFIG - The configuration to use.
 *
 * @returns {number} - The index of the property.
 */
export function getIndex(propertyToFind, CONFIG) {
	const allProperties = CONFIG.groups.flatMap(([, properties]) => properties);

	return (
		findLastIndex(allProperties, (propertyToMatch) =>
			matches(propertyToFind, propertyToMatch, CONFIG.wildcard),
		) + 1 || Number.POSITIVE_INFINITY
	);
}
