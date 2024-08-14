import type { GlobbyOptions } from "globby";

type makeOptional<A> = {
	[T in keyof A]?: A[T];
};

export interface RawConfig {
	/**
	 * NPM package containging configuration to extend. Alternatively, this may be a boolean. `true`
	 * to extend the default configuration. `false` to write this configuration from scratch.
	 *
	 * @default true
	 */

	extend: false;

	/**
	 * Function to generate comments. Alternatively, this may be an array with two items: what to
	 * put before the comment, and what to put after. (Note that arrays are not supported with
	 * `extend: false`.)
	 *
	 * @example
	 * 	Array version
	 * 	["\n/* "," *\/"]
	 *
	 * @default (group, { groups }) => (group === groups[1][0] ? "" : "\n/* "+ group" *\/")
	 */
	comment: RawConfigTypes.comment;
	/**
	 * The default group to put properties in if they don't fit in any other.
	 *
	 * @default miscellaneous
	 */
	defaultGroup: RawConfigTypes.defaultGroup;
	/**
	 * Options to pass on to [globby](https://npmjs.com/package/globby/). Note that some options are
	 * not allowed to be overriden.
	 *
	 * @default {dot: true, gitignore: true}
	 */
	glob: RawConfigTypes.glob;
	/**
	 * The groups to orginize the properties in. Each element of the array is another array of two
	 * elements. The first is the name of the group. The second is an array of properties this group
	 * contains. You may use a wildcard at the end of property names only. You may configure the
	 * wildcard used in the `config.wildcard` property.
	 *
	 * Important note for if `extend` is `false`: Math with 0 is weird, and since array indexes
	 * start at 0, the first element in the array must be `["", []]` so I can avoid that weird math
	 * xD. This is taken care of for you if `extend` is not `false`.
	 *
	 * See https://github.com/cobaltt7/css-prop-sort/blob/main/src/config.default.js#L13-L174 for
	 * default values.
	 */
	groups: RawConfigTypes.groups;
	/**
	 * Wildcard used in the groups. Must not contain alphanumeric characters, underscores, or
	 * dashes. May be multiple characters long.
	 *
	 * @default *
	 */
	wildcard: RawConfigTypes.wildcard;
}

interface CustomConfig extends makeOptional<RawConfig> {
	extend?: true | string;
	comment?: RawConfigTypes.comment | [string, string];
}

export type Config = RawConfig | CustomConfig;

namespace RawConfigTypes {
	export type extend = boolean | string;
	export type comment = (group: string, config: RawConfig) => string;
	export type defaultGroup = string;
	export type glob = Omit<
		GlobbyOptions,
		| "absolute"
		| "onlyFiles"
		| "unique"
		| "markDirectories"
		| "objectMode"
		| "onlyDirectories"
		| "stats"
	>;
	export type groups = [string, string[]][];
	export type wildcard = string;
}
