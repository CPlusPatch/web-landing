import { existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Extract the FrontMatter header from raw markdown
const frontMatterParser = function <T>(frontMatter: string) {
	const regex = /---\n([\s\S]+?)\n---/;
	const match = frontMatter.match(regex);
	if (!match) return null;
	const [, frontMatterString] = match;
	const frontMatterObject = frontMatterString
		.split("\n")
		.map(line => line.split(": "))
		.reduce(
			(acc, [key, value]) => {
				acc[key] = value;
				return acc;
			},
			{} as Record<string, string>
		);
	return frontMatterObject as T;
};

export default defineEventHandler(event => {
	const url = new URL(
		event.node.req.url ?? "",
		`http://${event.node.req.headers.host}`
	);

	// Get the path query parameter
	const filePath = decodeURIComponent(url.searchParams.get("path") ?? "");

	// Get dirname

	const file = join(
		dirname(fileURLToPath(import.meta.url)),
		"content",
		`${filePath}.md`
	);

	// If the file does not exist, return a 404
	if (!existsSync(file)) {
		return new Response("Not found", { status: 404 });
	}

	const fileContents = readFileSync(file, "utf8");

	const stripFrontMatter = function (markdown: string) {
		// Also strip the --- --- around the front matter
		return markdown.replace(/---\n([\s\S]+?)\n---/, "");
	};

	const frontMatter = frontMatterParser<{
		title: string;
		description: string;
		image: string;
		author: string;
		created_at: string;
		value: string;
		author_image: string;
		author_handle: string;
	}>(fileContents ?? "");

	return {
		headers: frontMatter,
		body: stripFrontMatter(fileContents ?? ""),
	};
});
