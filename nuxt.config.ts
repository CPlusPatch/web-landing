import { readdirSync } from "node:fs";
import { join } from "node:path";

/*
 * Reads the content directory and returns an array of all the files in the directory and subdirectories.
 */
const getRouteRenderingPaths = () => {
    const contentDir = join(process.cwd(), "content");
    const paths: string[] = [];

    const readDir = (dir: string) => {
        const files = readdirSync(dir);
        for (const file of files) {
            const filePath = join(dir, file);
            if (file.endsWith(".md")) {
                paths.push(
                    filePath.replace(contentDir, "/blog").replace(".md", ""),
                );
            } else {
                readDir(filePath);
            }
        }
    };

    readDir(contentDir);

    return paths;
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxtjs/seo",
        "@nuxtjs/tailwindcss",
        "@vueuse/nuxt",
        "nuxt-headlessui",
        "@nuxt/fonts",
        "nuxt-icon",
        "@nuxt/image",
    ],
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
    nitro: {
        compressPublicAssets: {
            gzip: false,
            brotli: false,
        },
        preset: "static",
        minify: true,
        prerender: {
            failOnError: true,
        },
    },
    ogImage: {
        enabled: false,
    },
    runtimeConfig: {
        public: {
            language: "en-US",
            titleSeparator: "·",
            siteName: "Lysand",
            trailingSlash: true,
        },
    },
    sitemap: {
        sources: [...getRouteRenderingPaths(), "/", "/privacy", "/contact"],
    },
    site: {
        url: "https://dev.lysand.org",
    },
});
