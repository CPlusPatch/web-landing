<script setup lang="ts">
import "~/styles/index.css";
import Uwuifier from "uwuifier";

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
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} · CPlusPatch` : "CPlusPatch";
    },
});

// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId());

useHead({
    link: [
        {
            rel: "me",
            href: "https://mk.cpluspatch.com/@jessew",
        },
    ],
});

const { Ctrl_U, Ctrl_V } = useMagicKeys({
    onEventFired: (e) => {
        if (e.ctrlKey && (e.key === "u" || e.key === "v")) {
            e.preventDefault();
        }
    },
    passive: false,
});

watchEffect(() => {
    if (Ctrl_U.value) {
        const uwuifier = new Uwuifier();
        applyFnToTextNodes((t) => uwuifier.uwuifySentence(t));
    }
});

watchEffect(() => {
    if (Ctrl_V.value) {
        applyFnToTextNodes((t) => swearWordify(t));
    }
});
</script>

<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>
</template>

<style>
html {
    color-scheme: dark;
}
</style>