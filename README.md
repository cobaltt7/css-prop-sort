# css-prop-sort

CLI to easily sort your CSS properties.

I watched [Kevin Powell's video on sorting CSS properties](https://www.youtube.com/watch?v=3Y03OSNw6zo) and I felt inspired to make a CLI tool to do the process automatically.

## Docs

This supports any runtime that you can use ES6 in. As the engine does not require any dependencies (only the CLI does), you can use it in browsers. (examples todo)

Usage: `npx css-prop-sort <files>` where `<files>` is a glob pattern with files to sort properties in. Note it must be a glob pattern to *files*, not directories. Default: `**.css` which matches all CSS files in the CWD recursively. NOTE: It will remove all whitespace from inside rules (whitespace seperating two rule is perserved)! For this reason, make sure that you run this BEFORE Prettier or other formatting tools.

configuration file docs todo, for now just make a file called `cssPropSort.config.js` in the root of your project with the following contents:
```js
/** @type {import("css-prop-sort/types").Config} */
const config = {
};

export default config;
```

If you use VSCode, it ~~should~~ will give you intellisense with descriptions of each property.

## next steps

todo 1: comments break it. idea: remove any comments that match a group name. then move the remaining comments around with the property below it. the latter should just be tweaking the regex.
todo 2: Don't output comments if only one group is in the rule.
todo 3: cli current file output like prettier
todo 4: reorder margin/padding in default config
todo 5: 1.0.0
