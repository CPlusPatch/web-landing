<script setup lang="ts">
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
</script>

<template>
	<HeadersNavbar />

	<div class="h-20 block"></div>

	<BlogPresentation />

	<FootersFooter />
</template>
