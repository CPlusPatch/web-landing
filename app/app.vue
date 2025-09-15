<script setup lang="ts">
import "~/styles/index.css";
import Dropdown from "./components/cli/dropdown.client.vue";
import { Toaster } from "./components/ui/sonner";

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
    logo: "/images/icons/logo.svg",
});

useSchemaOrg([me, myOrg]);

if (import.meta.server) {
    useSeoMeta({
        author: me.name,
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} · CPlusPatch` : "CPlusPatch";
        },
    });
}

useHead({
    link: [
        {
            rel: "me",
            href: "https://mk.cpluspatch.com/@jessew",
        },
    ],
});
</script>

<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
        <ClientOnly>
            <Dropdown />
        </ClientOnly>
    </NuxtLayout>

    <ClientOnly>
        <Toaster position="top-right" />
    </ClientOnly>
</template>

<style>
html {
    color-scheme: dark;
}
</style>