<script setup lang="ts">
useServerSeoMeta({
	title: "Blog",
	author: "Gaspard Wierzbinski",
	ogImage: "/images/assets/banner.webp",
	ogImageAlt: "A screenshot of VSCode open",
	description:
		"I make apps, websites, servers and dreams through FOSS and open standards. I am a student in computer science and a programmer by passion, with several years of experience in many kinds of fields",
	ogLocale: "en-US",
	ogLocaleAlternate: ["fr-FR", "en-US"],
});

useHead({
	title: "Blog",
});
</script>

<template>
	<HeadersNavbar />

	<div class="h-20 block"></div>

	<BlogPresentation />

	<FootersFooter />
</template>
