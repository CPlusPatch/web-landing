import { readdirSync } from "node:fs";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";

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
        "@vueuse/nuxt",
        "@nuxt/fonts",
        "@nuxt/image",
        "nuxt-security",
        "@nuxtjs/plausible",
        "@nuxt/content",
        "shadcn-nuxt",
    ],
    vite: {
        plugins: [tailwindcss()],
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
            htmlAttrs: { lang: "en-us", class: "dark" },
        },
    },
    image: {
        domains: [
            "cdn.cpluspatch.com",
            "cdn-web.cpluspatch.com",
            "s3.kitsunes.club",
            "unsplash.com",
            "cpluspatch.com",
        ],
        format: ["webp"],
        ipx: {
            maxAge: 60 * 60 * 24 * 365,
        },
    },
    security: {
        headers: {
            contentSecurityPolicy: {
                "img-src": ["'self'", "https:", "data:"],
                "script-src": [
                    "'self'",
                    "https:",
                    "'unsafe-inline'",
                    "'strict-dynamic'",
                    "'nonce-{{nonce}}'",
                    "'wasm-unsafe-eval'",
                ],
            },
        },
        rateLimiter: false,
    },
    routeRules: {
        // Disable CSP on /desktop because it fucks with the browser app
        "/desktop": {
            security: {
                headers: {
                    contentSecurityPolicy: false,
                },
            },
        },
    },
    nitro: {
        preset: "static",
        minify: true,
        prerender: {
            failOnError: true,
            crawlLinks: true,
            routes: ["/.well-known/webfinger"],
        },
    },
    sitemap: {
        sources: [...getRouteRenderingPaths(), "/", "/privacy", "/contact"],
    },
    fonts: {
        defaults: {
            weights: [400, 500, 600, 700],
        },
    },
    plausible: {
        // Prevent tracking on localhost
        ignoredHostnames: ["localhost"],
        apiHost: "https://logs.cpluspatch.com",
        autoOutboundTracking: true,
    },
    compatibilityDate: "2025-05-11",
    site: {
        url: "https://cpluspatch.com",
    },
    devtools: {
        enabled: true,
    },
});
