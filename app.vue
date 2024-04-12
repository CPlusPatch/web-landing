<script setup lang="ts">
const me = definePerson({
    name: "Gaspard Wierzbinski",
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
    titleTemplate: titleChunk => {
        return titleChunk ? `${titleChunk} · CPlusPatch` : "CPlusPatch";
    },
});

// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId())
</script>

<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>
</template>
