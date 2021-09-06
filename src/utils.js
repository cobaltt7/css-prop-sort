/** @file Miscellaneous Utility functions not specific to this project. */

/**
 * Find the first property with the given name in an array of objects.
 *
 * @param {string} property - The property to search for.
 * @param {{ [key: string]: any }[]} objects - The objects to search in.
 *
 * @returns {any} - The property value.
 */
export function findFirst(property, objects) {
	const nothing = undefined;

	for (const object of objects) if (object[`${property}`]) return object[`${property}`];

	return nothing;
}

/**
 * Bulk merge objects into one (shallow).
 *
 * @template T
 * @param {...T} objects - The objects to merge.
 *
 * @returns {T} - The merged object.
 */
export function bulkShallowMerge(...objects) {
	return Object.assign({}, ...objects.map((object) => object));
}

/**
 * `String.prototype.replaceAll` polyfill.
 *
 * @author [Grepper](https://www.codegrepper.com/profile/code-grepper)'s Answer to `js replace all`.
 * @param {string} string - The string to search.
 * @param {string} find - The string to replace with `replace`.
 * @param {string} replace - The string to replace `find` with.
 * @param {string} [flags] - Regular expression flags to use.
 *
 * @returns {string} - The replaced string.
 */
export function replaceAll(string, find, replace, flags = "") {
	/** Escape special characters. */
	const escaped = find.replace(/(?<character>[!$()*+./:=?[\\\]^{|}])/g, "\\$<character>");

	return string.replace(new RegExp(escaped, `${flags}g`), replace);
}
