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
        "@nuxt/image",
        "nuxt-security",
        "@nuxtjs/plausible",
        "shadcn-nuxt",
    ],

    tailwindcss: {
        // Don't inject the default @tailwind utilities CSS
        // To avoid conflicts with our own styles
        cssPath: false,
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
            "cdn.lysand.org",
            "lysand.org",
            "static.wikia.nocookie.net",
        ],
        ipx: {
            maxAge: 60 * 60 * 24 * 365,
        },
    },

    security: {
        headers: {
            contentSecurityPolicy: {
                "img-src": ["'self'", "https:", "data:"],
            },
        },
        rateLimiter: false,
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

    runtimeConfig: {
        public: {
            language: "en-US",
            titleSeparator: "·",
            siteName: "CPlusPatch",
            trailingSlash: true,
        },
    },

    sitemap: {
        sources: [...getRouteRenderingPaths(), "/", "/privacy", "/contact"],
    },

    plausible: {
        // Prevent tracking on localhost
        ignoredHostnames: ["localhost"],
        apiHost: "https://logs.cpluspatch.com",
        autoOutboundTracking: true,
    },

    compatibilityDate: "2024-08-28",

    site: {
        url: "https://cpluspatch.com",
    },

    devtools: {
        enabled: true,
    },
});
