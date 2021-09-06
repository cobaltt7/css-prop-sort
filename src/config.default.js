/** @file Default Configuration. */

/** @type {import("../types").RawConfig} */
const config = {
	comment: (group) => `\n/* ${group} *\/`,

	defaultGroup: "miscellaneous",

	extend: false,

	glob: { dot: true, gitignore: true },

	groups: [
		["", []],
		["priority", ["all", "--*", "content"]],
		[
			"display",
			[
				"display",
				"column*",
				"flex*",
				"align-*",
				"justify-*",
				"place-*",
				"vertical-align",
				"grid*",
				"gap",
				"row-gap",
				"masonry-auto-flow",
				"list-*",
				"table-layout",
				"empty-cells",
				"break-*",
				"page-break-*",
				"content-visibility",
				"visibility",
			],
		],
		[
			"positioning",
			[
				"position",
				"inset",
				"top",
				"right",
				"bottom",
				"left",
				"float",
				"clear",
				"contain",
				"object-position",
			],
		],
		[
			"box",
			[
				"box-sizing",
				"min-width",
				"width",
				"max-width",
				"min-height",
				"height",
				"max-height",
				"min-block-size",
				"block-size",
				"max-block-size",
				"min-inline-size",
				"inline-size",
				"max-inline-size",
				"aspect-ratio",
				"object-fit",
				"padding*",
				"border*",
				"margin-*",
				"background*",
				"backdrop-filter",
				"box-decoration-break",
			],
		],
		[
			"typography",
			[
				"color",
				"caret-color",
				"accent-color",
				"text*",
				"font*",
				"letter-spacing",
				"quotes",
				"word-*",
				"line*",
				"orphans",
				"widows",
				"ascent-override",
				"overflow-wrap",
				"direction",
				"writing-mode",
				"ruby-*",
				"unicode-bidi",
				"user-select",
			],
		],
		[
			"manipulation",
			[
				"transition",
				"animation*",
				"transform*",
				"translate",
				"clip*",
				"filter",
				"mask",
				"offset",
				"opacity",
				"rotate",
				"scale",
				"backface-visibility",
				"image-orientation",
				"mix-blend-mode",
				"shape-*",
				"scroll-*",
				"overscroll-*",
				"order",
				"isolation",
				"z-index",
				"perspective",
			],
		],
	],

	wildcard: "*",
};

export default config;
