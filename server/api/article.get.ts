import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { frontMatterParser, getMarkdownRenderer } from "~/utils/markdown";

export default defineEventHandler(async (event) => {
    const url = new URL(
        event.node.req.url ?? "",
        `http://${event.node.req.headers.host}`,
    );

    // Get the path query parameter
    const filePath = decodeURIComponent(url.searchParams.get("path") ?? "");

    // Get dirname

    const file = join(process.cwd(), "content", `${filePath}.md`);

    // If the file does not exist, return a 404
    if (!existsSync(file)) {
        return new Response("Not found", { status: 404 });
    }

    const fileContents = readFileSync(file, "utf8");

    const stripFrontMatter = (markdown: string) => {
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

    const renderedBody = (await getMarkdownRenderer()).render(
        stripFrontMatter(fileContents ?? ""),
    );

    return {
        headers: frontMatter,
        body: renderedBody,
    };
});
