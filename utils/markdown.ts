import MarkdownIt from "markdown-it";
import markdownItTocDoneRight from "markdown-it-toc-done-right";
import markdownItContainer from "markdown-it-container";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTaskLists from "@hackmd/markdown-it-task-lists";
import { fromHighlighter } from "@shikijs/markdown-it/core";
import { getHighlighterCore } from "shiki/core";

const highlighter = getHighlighterCore({
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

export const getMarkdownRenderer = async () => {
	const renderer = MarkdownIt({
		html: true,
		linkify: true,
	});

	const otherRenderer = MarkdownIt({
		html: true,
		linkify: true,
	});

	renderer.use(
		fromHighlighter((await highlighter) as any, {
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

	renderer.use(md => {
		md.renderer.rules.html_block = (tokens, idx) => {
			// Modify figure tags
			if (tokens[idx].content.startsWith("<figure")) {
				const imageUrl = (tokens[idx].content.match(
					/src="([^"]+)"/
				) ?? [null, null])[1];

				if (!imageUrl) {
					return otherRenderer.render(tokens[idx].content);
				}

				// Delete the first / if it exists
				const newUrl = `/_ipx/w_800&f_webp/${imageUrl.replace(/^\//, "")}`;

				return tokens[idx].content.replace(imageUrl, newUrl);
			} else {
				return otherRenderer.render(tokens[idx].content);
			}
		};

		md.renderer.rules.image = (tokens, idx, options, env, self) => {
			const output = otherRenderer.renderer.rules.image!(
				tokens,
				idx,
				options,
				env,
				self
			);

			const imageUrl = (output.match(/src="([^"]+)"/) ?? [null, null])[1];

			if (!imageUrl) {
				return output;
			}

			const newUrl = `/_ipx/w_800&f_webp/${imageUrl.replace(/^\//, "")}`;

			return output.replace(imageUrl, newUrl);
		};
	});

	return renderer;
};
