import { cpSync } from "fs";
import { join } from "path";

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
			routes: ["/blog/en/security/opsec-and-you", "/", "/privacy"],
		},
		preset: "bun",
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
	site: {
		url: "https://cpluspatch.com",
	},
});
