import { cpSync, readdirSync } from "fs";
import { join } from "path";

/*
 * Reads the content directory and returns an array of all the files in the directory and subdirectories.
 */
const getRouteRenderingPaths = () => {
	const contentDir = join(process.cwd(), "content");
	const paths: string[] = [];

	const readDir = (dir: string) => {
		const files = readdirSync(dir);
		files.forEach(file => {
			const filePath = join(dir, file);
			if (file.endsWith(".md")) {
				paths.push(
					filePath.replace(contentDir, "/blog").replace(".md", "")
				);
			} else {
				readDir(filePath);
			}
		});
	};

	readDir(contentDir);

	return paths;
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@unocss/nuxt",
		"nuxt-headlessui",
		"nuxt-icon",
		"@vueuse/nuxt",
		"@nuxtjs/seo",
		"@nuxtjs/i18n",
		"@nuxt/image",
	],
	image: {
		domains: [
			"cdn.cpluspatch.com",
			"cdn-web.cpluspatch.com",
			"s3.kitsunes.club",
			"unsplash.com",
			"thoughtfullaw.com",
			"aip.cpluspatch.dev",
			"www.muylinux.com",
			"matrix.org",
			"github.com",
			"cpluspatch.com",
			"pool.jortage.com",
			"kitsu.life",
			"media.mastodon.de",
			"opengraph.githubassets.com",
			"avatars.githubusercontent.com",
			"raw.githubusercontent.com",
		],
		ipx: {
			maxAge: 60 * 60 * 24 * 365,
		},
	},
	app: {
		head: {
			link: [
				{
					rel: "icon",
					href: "/favicon.png",
					type: "image/png",
				},
			],
			htmlAttrs: { lang: "en-us" },
		},
	},
	i18n: {
		strategy: "prefix_except_default",
		defaultLocale: "en-US",
		locales: [
			{
				code: "en-US",
				iso: "en-US",
			},
			{
				code: "fr-FR",
				iso: "fr-FR",
			},
		],
	},
	nitro: {
		compressPublicAssets: {
			gzip: true,
			brotli: false,
		},
		routeRules: {
			"/_nuxt/**": {
				swr: 60 * 60 * 24 * 365,
			},
			"/images/**": {
				swr: 60 * 60 * 24 * 365,
			},
		},
		prerender: {
			failOnError: false,
			routes: [...getRouteRenderingPaths(), "/", "/privacy", "/contact"],
		},
		preset: "bun",
		minify: true,
	},
	runtimeConfig: {
		public: {
			language: "en-US",
			titleSeparator: "·",
			siteName: "CPlusPatch",
			trailingSlash: true,
			siteUrl: "https://cpluspatch.com",
		},
	},
	hooks: {
		"nitro:build:public-assets": nitro => {
			// copy content to .output/server/content
			const targetDir = join(nitro.options.output.serverDir, "content");
			cpSync("./content", targetDir, { recursive: true });
		},
	},
	sitemap: {
		sources: [...getRouteRenderingPaths(), "/", "/privacy", "/contact"],
	},
	site: {
		url: "https://cpluspatch.com",
	},
});
