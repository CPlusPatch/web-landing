import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { frontMatterParser } from "~/utils/markdown";

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
	const results: {
        frontMatter: {
			title: string;
			description: string;
			image: string;
			author: string;
			created_at: string;
			value: string;
			author_image: string;
			author_handle: string;
		} | null;
        path: string;
    }[] = [];

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

	// Sort by date
	return results.sort(
		(a, b) =>
			new Date(Number(b.frontMatter?.created_at)).getTime() -
			new Date(Number(a.frontMatter?.created_at)).getTime()
	);
});
