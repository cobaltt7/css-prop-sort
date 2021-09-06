import type { GlobbyOptions } from "globby";

type makeOptional<A> = {
	[T in keyof A]?: A[T];
};

export interface RawConfig {
	/**
	 * NPM package containging configuration to extend. Alternatively, this may be a boolean. `true`
	 * to extend the default configuration. `false` to write this configuration from scratch. If
	 * this is false, checkout the important note on `groups`.
	 *
	 * @defaultValue true
	 */

	extend: false;

	/**
	 * Function to generate comments.
	 *
	 * @defaultValue (group, { groups }) => (group === groups[1][0] ? "" : \`\n/* ${group} *\/\`)
	 */
	comment: ConfigTypes.comment;
	/**
	 * The default group to put properties in if they don't fit in any other.
	 *
	 * @defaultValue miscellaneous
	 */
	defaultGroup: ConfigTypes.defaultGroup;
	/**
	 * Options to pass on to [globby](https://npmjs.com/package/globby/). Note that some options are
	 * not allowed to be overriden.
	 *
	 * @defaultValue {dot: true, gitignore: true}
	 */
	glob: ConfigTypes.glob;
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
	 * @defaultValue *See https://github.com/RedGuy12/css-prop-sort/blob/main/src/config.default.js#L13-L129*
	 */
	groups: ConfigTypes.groups;
	/**
	 * Wildcard used in the groups. Must not contain alphanumeric characters, underscores, or dashes.
	 *
	 * @defaultValue *
	 */
	wildcard: ConfigTypes.wildcard;
}

interface CustomConfig extends makeOptional<RawConfig> {
	extend?: true | string;
}

export type Config = RawConfig | CustomConfig;

namespace ConfigTypes {
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
