<script setup lang="ts">
import Blog from "~/components/landing/blog/section.vue";

useServerSeoMeta({
    title: "Blog",
    ogTitle: "Blog",
    author: "Gaspard Wierzbinski",
    ogImage: "/images/assets/banner-2.webp",
    ogImageAlt: "A screenshot of VSCode open",
    description:
        "Blog posts about programming, computer science, software engineering, and other topics.",
    ogDescription:
        "Blog posts about programming, computer science, software engineering, and other topics.",
    ogLocale: "en-US",
    ogLocaleAlternate: ["fr-FR", "en-US"],
});

definePageMeta({
    layout: "navbar-and-footer",
});
</script>

<template>
	<Blog class="py-32" />
</template>
