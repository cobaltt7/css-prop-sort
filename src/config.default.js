/** @file Default Configuration. */

/** @type {import("../types").RawConfig} */
const config = {
	comment: (group, { groups }) => (group === groups[1][0] ? "" : `\n/* ${group} *\/`),

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
				"align*",
				"justify*",
				"place*",
				"vertical-align",
				"grid*",
				"grid*start",
				"grid*end",
				"gap",
				"row-gap",
				"masonry-auto-flow",
				"list*",
				"table-layout",
				"empty-cells",
				"break*",
				"page-break*",
				"content-visibility",
				"visibility",
			],
		],
		[
			"positioning",
			[
				"position",
				"inset*",
				"inset*start*",
				"inset*end*",
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
				"padding*start*",
				"padding*end*",
				"padding*top*",
				"padding*left*",
				"padding*bottom*",
				"padding*right*",
				"border*",
				"border*start*",
				"border*start*start*",
				"border*start*end*",
				"border*end*",
				"border*end*start*",
				"border*end*end*",
				"border*top*",
				"border*top*left*",
				"border*top*right*",
				"border*left*",
				"border*bottom*",
				"border*bottom*left*",
				"border*bottom*right*",
				"border*right*",
				"margin*",
				"margin*start*",
				"margin*end*",
				"margin*top*",
				"margin*left*",
				"margin*bottom*",
				"margin*right*",
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
				"word*",
				"line*",
				"orphans",
				"widows",
				"ascent-override",
				"overflow-wrap",
				"direction",
				"writing-mode",
				"ruby*",
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
				"box-shadow",
				"shape*",
				"scroll*",
				"scroll*padding*",
				"scroll*padding*start*",
				"scroll*padding*end*",
				"scroll*padding*top*",
				"scroll*padding*left*",
				"scroll*padding*bottom*",
				"scroll*padding*right*",
				"scroll*margin*",
				"scroll*margin*start*",
				"scroll*margin*end*",
				"scroll*margin*top*",
				"scroll*margin*left*",
				"scroll*margin*bottom*",
				"scroll*margin*right*",
				"overscroll*",
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
