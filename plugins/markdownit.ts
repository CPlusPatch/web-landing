import MarkdownIt from "markdown-it";
import markdownItTocDoneRight from "markdown-it-toc-done-right";
import markdownItContainer from "markdown-it-container";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTaskLists from "@hackmd/markdown-it-task-lists";
import { fromHighlighter } from "@shikijs/markdown-it/core";
import { getHighlighterCore } from "shiki/core";

const highlighter = await getHighlighterCore({
	themes: [import("shiki/themes/rose-pine.mjs")],
	langs: [
		import("shiki/langs/javascript.mjs"),
		import("shiki/langs/typescript.mjs"),
		import("shiki/langs/python.mjs"),
		import("shiki/langs/toml.mjs"),
		import("shiki/langs/rust.mjs"),
		import("shiki/langs/sql.mjs"),
		import("shiki/langs/json.mjs"),
		import("shiki/langs/html.mjs"),
		import("shiki/langs/css.mjs"),
		import("shiki/langs/scss.mjs"),
		import("shiki/langs/bash.mjs"),
		import("shiki/langs/shell.mjs"),
		import("shiki/langs/yaml.mjs"),
	],
	loadWasm: import("shiki/wasm"),
});

export default defineNuxtPlugin(() => {
	const renderer = MarkdownIt({
		html: true,
		linkify: true,
	});

	renderer.use(
		fromHighlighter(highlighter as any, {
			theme: "rose-pine",
		})
	);

	renderer.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.ariaHidden({
			symbol: "",
			placement: "before",
		}),
	});

	renderer.use(markdownItTocDoneRight, {
		containerClass: "toc",
		level: [1, 2, 3, 4],
		listType: "ul",
		listClass: "toc-list",
		itemClass: "toc-item",
		linkClass: "toc-link",
	});

	renderer.use(markdownItTaskLists);

	renderer.use(markdownItContainer);

	return {
		provide: {
			mdRenderer: renderer,
		},
	};
});
