<script setup lang="ts">
import Container from "~/components/containers/big.vue";
defineProps<{
    isJesse: boolean;
}>();

const scrollIntoView = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const openInNewTab = (url: string) => window.open(url, "_blank");
</script>

<template>
    <Container class="lg:flex *:mx-auto *:max-w-2xl">
        <div class="shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8 mt-20">
            <h1 class="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                {{ isJesse ? "Hii :3" : "Heya" }},<br />
                I'm {{ !isJesse ? "CPlusPatch" : "Jesse 🏳️‍⚧️" }}
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-300">
                I make apps, websites, servers and dreams through FOSS and
                open standards. I am a student in computer engineering and a
                programmer by passion, with several years of experience in
                many kinds of fields
            </p>
            <div class="mt-10 flex items-center gap-x-6">
                <NuxtLink href="/contact" :class="[
                    'rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-400',
                    isJesse && 'text-black/0 bg-[linear-gradient(to_right,#5BCEFA,#5BCEFA_20%,#F5A9B8_20%,#F5A9B8_40%,#FFFFFF_40%,#FFFFFF_60%,#F5A9B8_60%,#F5A9B8_80%,#5BCEFA_80%,#5BCEFA)]'
                ]">
                    Contact me
                </NuxtLink>
                <a href="#philosophy" class="text-sm font-semibold leading-6 group text-white"
                    @click.prevent="scrollIntoView('philosophy')">
                    Read more
                    <ButtonsAnimatedArrow />
                </a>
            </div>
        </div>
        <div class="mt-16 flex sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <img @click="openInNewTab('/videos/why-dont-you-go-craft-some-bitches.webm')"
                    src="/images/assets/banner-2.webp" alt="VSCode screenshot" width="2432" height="1442"
                    class="w-304 rounded-md bg-white/5 hover:cursor-pointer backdrop-blur-xl shadow-2xl ring-1 ring-white/10 hover:rotate-[0.5deg] duration-100 ease-in-out" />
            </div>
        </div>
    </Container>
</template>