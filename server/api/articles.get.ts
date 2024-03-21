import { readdirSync, readFileSync } from "fs";
import { join } from "path";

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

export default defineEventHandler(() => {
	const directoryPath = join(process.cwd(), "content");

	const getFiles = (dirPath: string): string[] => {
		const entries = readdirSync(dirPath, { withFileTypes: true });
		const filePaths = entries.map(entry => {
			const res = join(dirPath, entry.name);
			return entry.isDirectory() ? getFiles(res) : res;
		});
		return Array.prototype.concat(...filePaths);
	};

	const files = getFiles(directoryPath);
	const results = [];

	for (const file of files) {
		const fileContents = readFileSync(file, "utf8");

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

		results.push({
			frontMatter,
			path: file.split("content/")[1].replace(".md", ""),
		});
	}

	return results;
});
