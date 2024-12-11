<script setup lang="ts">
import Blog from "~/components/landing/blog/section.vue";
import Cta from "~/components/landing/cta/section.vue";
import Destructor from "~/components/landing/destructor/section.vue";
import Hero from "~/components/landing/hero/section.vue";
import Languages from "~/components/landing/languages/section.vue";
import Philosophy from "~/components/landing/philosophy/section.vue";
import Projects from "~/components/landing/projects/section.vue";
import Stats from "~/components/landing/stats/section.vue";
import Testimonials from "~/components/landing/testimonials/section.vue";
import Audio from "~/components/widgets/audio.vue";

useServerSeoMeta({
    title: "Homepage",
    ogTitle: "Homepage",
    author: "Gaspard Wierzbinski",
    ogImage: "/images/assets/banner-2.webp",
    ogImageAlt: "A screenshot of VSCode open",
    description:
        "I make apps, websites, servers and dreams through FOSS and open standards. I am a student in computer engineering and a programmer by passion, with several years of experience in many kinds of fields",
    ogDescription:
        "I make apps, websites, servers and dreams through FOSS and open standards. I am a student in computer engineering and a programmer by passion, with several years of experience in many kinds of fields",
    ogLocale: "en-US",
    ogLocaleAlternate: ["fr-FR", "en-US"],
});
</script>

<template>
    <div class="flex flex-col gap-48">
        <HeadersNavbar />

        <Hero />

        <Philosophy />

        <Testimonials />

        <Stats />

        <Projects />

        <Languages />

        <Cta />

        <Blog />

        <Destructor />

        <FootersFooter />
        
        <Audio />
    </div>
</template>
