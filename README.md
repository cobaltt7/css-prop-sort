# css-prop-sort

CLI to easily sort your CSS properties.

I watched [Kevin Powell's video on sorting CSS properties](https://www.youtube.com/watch?v=3Y03OSNw6zo) and I felt inspired to make a CLI tool to do the process automatically.

NOTE: It will remove all whitespace from inside rules (whitespace separating two rules is preserved)! For this reason, make sure that you run this BEFORE Prettier or other formatting tools.

## Usage

This supports any runtime that you can use ES6 in. As the engine does not require any dependencies (only the CLI does), you can use it in browsers. As this is also published as an NPM module, you can use it in Node.JS.

### CLI

Requires a Node.JS version `^14.13.1 || >=16.0.0`.

```sh
npx css-prop-sort <file>
```

where `<files>` is a glob pattern with files to sort properties in. Note it must be a glob pattern to _files_, not directories. Default: `**.css` which matches all CSS files in the CWD recursively. You can separate multiple patterns with spaces.

The optional argument `-c` or `--config` can be used to specify a configuration file. If you do not specify a configuration file, it will search upwards for a `package.json` file with a `cssPropSort` propery. If it is not found, it will search upwards for each of the following and use the first one it finds: `cssPropSort.config.json` `cssPropSort.config.js` `cssPropSort.config.cjs` `cssPropSort.config.mjs`. If none of those are found, the default configuration will be used. To force it to use the default configuration, add `"cssPropSort": {}` to your package.json file.

### Node.JS API

Requires a Node.JS version `^12.20.0 || ^14.13.1 || >=16.0.0`.

```sh
npm install css-prop-sort
```

```js
import sortCssProperties from "css-prop-sort";
import parseCssSortConfig from "css-prop-sort/config";

sortCssProperties(
	"a { color: blue; text-decoration: none; }",
	parseCssSortConfig(/* Object with configuration */)
);
```

Both parameters are _required_.

If you want to use the default configuration you have two options:

```js
import sortCssProperties from "css-prop-sort";
import parseCssSortConfig from "css-prop-sort/config";

sortCssProperties("a { color: blue; text-decoration: none; }", parseCssSortConfig({}));
```

```js
import sortCssProperties from "css-prop-sort";
import defaultCssSortConfig from "css-prop-sort/config.default";

sortCssProperties("a { color: blue; text-decoration: none; }", defaultCssSortConfig);
```

### Browser Usage

Requires any browser with ES6 support.

You can either import the library directly from a CDN like UNPKG or jsDeliver, download it yourself, or use a bundling tool such as Webpack or Parcel.

The API is the same as the Node.JS one.

## Configuration

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `extend` | NPM package containging configuration to extend. Alternatively, this may be a boolean. `true` to extend the default configuration. `false` to write this configuration from scratch. | `boolean \| string` | `true` |
| `comment` | Function to generate comments. Alternatively, this may be an array with two items: what to put before the comment, and what to put after. (Note that arrays are not supported with `extend: false`. Array example: `["\n/* "," *\/"]`. | `((group: string, config: RawConfig) => string) \| [string, string]` | `(group, { groups }) => (group === groups[1][0] ? "" : "\n/* "+ group" *\/")` |
| `defaultGroup` | The default group to put properties in if they don't fit in any other. | `string` | `"miscellaneous"` |
| `glob` | Options to pass on to [globby](https://npmjs.com/package/globby/). Note that some options are not allowed to be overriden. | `Omit<GlobbyOptions, \| "absolute" \| "onlyFiles" \| "unique" \| "markDirectories" \| "objectMode" \| "onlyDirectories" \| "stats">` | `{ dot: true, gitignore: true }` |
| `groups` | The groups to orginize the properties in. Each element of the array is another array of two elements. The first is the name of the group. The second is an array of properties this group contains. You may use a wildcard at the end of property names only. You may configure the wildcard used in the `config.wildcard` property. Important note for if `extend` is `false`: Math with 0 is weird, and since array indexes start at 0, the first element in the array must be `["", []]` so I can avoid that weird math xD. This is taken care of for you if `extend` is not `false`. | `[string, string[]][]` | _See https://github.com/RedGuy12/css-prop-sort/blob/main/src/config.default.js#L13-L174_ |
| `wildcard` | Wildcard used in the groups. Must not contain alphanumeric characters, underscores, or dashes. | `string` | `"*"` |

### Bonus tip

Make a file called `cssPropSort.config.js` in the root of your project with the following contents:

```js
/** @type {import("css-prop-sort/types").Config} */
const config = {};

export default config;
```

or if you use CJS:

<!-- eslint-disable import/no-commonjs -- This is a CJS example -->

```js
/** @type {import("css-prop-sort/types").Config} */
module.exports = {};
```

<!-- eslint-enable import/no-commonjs -->

Depending on your IDE (I tested in Visual Studio Code), it should give you IntelliSense with descriptions of each property on hover.
