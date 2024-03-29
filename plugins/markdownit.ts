import MarkdownIt from "markdown-it";
import Shiki from "@shikijs/markdown-it";
import markdownItTocDoneRight from "markdown-it-toc-done-right";
import markdownItContainer from "markdown-it-container";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTaskLists from "@hackmd/markdown-it-task-lists";

export default defineNuxtPlugin(async () => {
	const renderer = MarkdownIt({
		html: true,
		linkify: true,
	});

	renderer.use(
		await Shiki({
			theme: "synthwave-84",
			langs: [
				"javascript",
				"typescript",
				"python",
				"toml",
				"rust",
				"sql",
				"json",
				"html",
				"css",
				"scss",
				"bash",
				"shell",
				"yaml",
			],
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
