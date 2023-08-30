<script setup lang="ts">
import "./styles/index.css";
import "@unocss/reset/tailwind.css";

const me = definePerson({
	name: `Gaspard Wierzbinski`,
	image: "/images/avatars/with_background.webp",
	sameAs: [
		"https://codeberg.org/CPlusPatch",
		"https://github.com/CPlusPatch",
		"mailto:contact@cpluspatch.com",
		"https://matrix.to/#/@jesse:cpluspatch.dev",
	],
	description:
		"Young aspiring software engineer, proficient in Web technologies and computers in general",
	url: "/",
});

const myOrg = defineOrganization({
	name: "CPlusPatch Development",
	logo: "/public/images/icons/logo.svg",
});

useSchemaOrg([me, myOrg]);

useServerSeoMeta({
	author: me.name,
});
</script>

<template>
	<OgImageScreenshot />
	<OgImageStatic />
	<NuxtLayout>
		<NuxtLoadingIndicator />
		<NuxtPage />
	</NuxtLayout>
</template>
