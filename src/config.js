/** @file Load, Parse, and merge configuration files. */

import defaultConfig from "./config.default.js";
import { bulkShallowMerge, findFirst } from "./utils.js";

/**
 * Merge multiple property groups into one.
 *
 * @param {import("../types").RawConfigTypes.defaultGroup} defaultGroup - The name of the default group.
 * @param {...import("../types").RawConfigTypes.groups} groupsArray - The groups to merge.
 *
 * @returns {import("../types").RawConfigTypes.groups} - The merged groups.
 */
function mergeGroups(defaultGroup, ...groupsArray) {
	return groupsArray.reduce((accumulated, current) => {
		let returnValue = accumulated;

		for (const searchForGroup of current) {
			// Remove already existing properties
			returnValue = returnValue.map(([group, properties]) => [
				group,
				properties.filter((property) => !searchForGroup[1].includes(property)),
			]);

			// Add properties
			if (searchForGroup[0] === defaultGroup) continue;

			const groupIndex = returnValue.findIndex((group) => group[0] === searchForGroup[0]);

			if (groupIndex === -1) returnValue.push(searchForGroup);
			else if (groupIndex === 0) continue;
			else
				returnValue[+groupIndex][1] = returnValue[+groupIndex][1].concat(searchForGroup[1]);
		}

		return returnValue;
	}, []);
}

/**
 * Merge multiple configuration objects into one.
 *
 * @param {...import("../types").Config} configs - The configuration objects to merge.
 *
 * @returns {Promise<import("../types").RawConfig>} -
 */
export default async function mergeConfigs(...configs) {
	if (configs.length === 0) return defaultConfig;

	const lastConfig = configs[configs.length - 1];

	if (typeof lastConfig.extend === "string")
		return mergeConfigs(...configs, await import(lastConfig.extend));

	// If `lastConfig.extend` is not false, it must be true or undefined. Merge with the default config.
	if (lastConfig.extend !== false) return mergeConfigs(...configs, defaultConfig);

	// If it is false, merge all configs.
	const comment = findFirst("comment", configs) || defaultConfig.comment,
		defaultGroup = findFirst("defaultGroup", configs) || defaultConfig.defaultGroup,
		wildcard = findFirst("wildcard", configs) || defaultConfig.wildcard;

	if (/[\w-]/.test(wildcard))
		throw new SyntaxError(`Invalid config. The wildcard ${wildcard} is invalid`);

	return {
		comment:
			typeof comment === "function"
				? comment
				: (group) => `${comment[0]}${group}${comment[1]}`,

		defaultGroup,
		extend: false,
		glob: bulkShallowMerge(...configs.map(({ glob }) => glob)) || defaultConfig.glob,
		groups: mergeGroups(defaultGroup, ...configs.map(({ groups }) => groups || [])),
		wildcard,
	};
}
