<script setup lang="ts">
useServerSeoMeta({
    title: "Homepage",
    ogTitle: "Homepage",
    author: "Gaspard Wierzbinski",
    ogImage: "/images/assets/banner-2.webp",
    ogImageAlt: "A screenshot of VSCode open",
    description:
        "I make apps, websites, servers and dreams through FOSS and open standards. I am a student in computer science and a programmer by passion, with several years of experience in many kinds of fields",
    ogDescription:
        "I make apps, websites, servers and dreams through FOSS and open standards. I am a student in computer science and a programmer by passion, with several years of experience in many kinds of fields",
    ogLocale: "en-US",
    ogLocaleAlternate: ["fr-FR", "en-US"],
});

const scrollIntoView = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const isJesse = useJesse();
</script>

<template>
    <HeadersNavbar />

    <div class="relative isolate overflow-hidden">
        <svg class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true">
            <defs>
                <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1"
                    patternUnits="userSpaceOnUse">
                    <path d="M.5 200V.5H200" fill="none" />
                </pattern>
            </defs>
            <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
                <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                    stroke-width="0" />
            </svg>
            <rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
        </svg>
        <div class="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
            aria-hidden="true">
            <div class="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-orange-500 to-red-600 opacity-20" style="
					clip-path: polygon(
						73.6% 51.7%,
						91.7% 11.8%,
						100% 46.4%,
						97.4% 82.2%,
						92.5% 84.9%,
						75.7% 64%,
						55.3% 47.5%,
						46.5% 49.4%,
						45% 62.9%,
						50.3% 87.2%,
						21.3% 64.1%,
						0.1% 100%,
						5.4% 51.1%,
						21.4% 63.9%,
						58.9% 0.2%,
						73.6% 51.7%
					);
				"></div>
        </div>
        <div class="mx-auto max-w-7xl px-6 pb-24 pt-30 sm:pb-32 lg:flex lg:px-8 lg:py-40">
            <div class="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8 mt-20">
                <h1 class="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    {{ isJesse ? "Hii :3" : "Heya" }},<br />
                    I'm {{ !isJesse ? "CPlusPatch" : "Jesse 🏳️‍⚧️" }}
                </h1>
                <p class="mt-6 text-lg leading-8 text-gray-300">
                    I make apps, websites, servers and dreams through FOSS and
                    open standards. I am a student in computer science and a
                    programmer by passion, with several years of experience in
                    many kinds of fields
                </p>
                <div class="mt-10 flex items-center gap-x-6">
                    <NuxtLink href="/contact" :class="['rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400',
                        isJesse && 'text-black/0 bg-[linear-gradient(to_right,#5BCEFA,#5BCEFA_20%,#F5A9B8_20%,#F5A9B8_40%,#FFFFFF_40%,#FFFFFF_60%,#F5A9B8_60%,#F5A9B8_80%,#5BCEFA_80%,#5BCEFA)]'
                    ]">
                        Contact me</NuxtLink>
                    <a href="#philosophy" class="text-sm font-semibold leading-6 group text-white"
                        @click.prevent="scrollIntoView('philosophy')">Read more
                        <ButtonsAnimatedArrow />
                    </a>
                </div>
            </div>
            <div
                class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                    <img src="/images/assets/banner-2.webp" alt="VSCode screenshot" width="2432" height="1442"
                        class="w-[76rem] rounded-md bg-white/5 backdrop-blur-xl shadow-2xl ring-1 ring-white/10" />
                </div>
            </div>
        </div>
    </div>

    <div id="philosophy" class="relative">
        <div class="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
            <div
                class="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2 rounded-l-full">
                <div class="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0 lg:rounded-r-lg overflow-hidden">
                    <img loading="lazy"
                        class="absolute inset-y-0 right-0 h-full w-full bg-white/5 backdrop-blur-xl object-cover max-w-6xl"
                        src="/images/assets/buildings.webp" alt="" />
                </div>
            </div>
            <div class="px-6 lg:contents">
                <div
                    class="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
                    <p class="text-base font-semibold leading-7 text-orange-300"></p>
                    <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
                        My philosophy
                    </h1>
                    <p class="mt-6 text-xl leading-8 text-gray-200">
                        I believe in the power of open source and open
                        standards. Nearly all of my work is licensed under a
                        free license such as the GPLv3, which allows me to work
                        with secure, extensible and reliable software.
                    </p>
                    <div class="mt-10 max-w-xl text-base leading-7 text-gray-200 lg:max-w-none">
                        <p>
                            While writing code, I adhere to my own set of
                            principles, which I apply as part of my philosophy
                            to achieve excellence. Here are some of the things I
                            believe in:
                        </p>
                        <ul role="list" class="mt-8 space-y-6 text-gray-300">
                            <li class="flex gap-x-3">
                                <iconify-icon icon="tabler:brand-docker" height="none"
                                    class="mt-1 h-5 w-5 flex-none text-orange-500" aria-hidden="true" />
                                <span><strong class="font-semibold text-gray-50">Build Reproducibility</strong>
                                    I use systems such as Docker or Nix to build
                                    and deploy my systems in a way that is
                                    reproducible and sandboxed.</span>
                            </li>
                            <li class="flex gap-x-3">
                                <iconify-icon icon="tabler:list-check" height="none"
                                    class="mt-1 h-5 w-5 flex-none text-orange-500" aria-hidden="true" />
                                <span><strong class="font-semibold text-gray-50">Automatic Linting & Formatting</strong>
                                    My apps are strictly checked for errors
                                    whenever I edit code, leading to less bugs
                                    and better-looking outputs.
                                </span>
                            </li>
                            <li class="flex gap-x-3">
                                <iconify-icon icon="tabler:3d-cube-sphere" height="none"
                                    class="mt-1 h-5 w-5 flex-none text-orange-500" aria-hidden="true" />
                                <span><strong class="font-semibold text-gray-50">Extensibility and
                                        Futureproofing</strong>
                                    Apps should be written with scaling up in
                                    mind, and this is true of any system. Things
                                    should be done in a way that they still make
                                    sense later on.</span>
                            </li>
                        </ul>
                        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-50">
                            Security
                        </h2>
                        <p class="mt-6">
                            I am a fervent believer in security and hardening:
                            all my devices are protected with full-disk
                            encryption, I follow industry-standard security
                            practices and use Linux and open systems with a
                            hardened configuration everywhere.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <TestimonialsGrid />

    <StatsBars />

    <ProjectsOverview />

    <GridsSlidingLanguageCarousel />

    <div class="mx-auto max-w-7xl pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div
            class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Work with me today.
            </h2>
            <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Need more information? Want to have a chat? I'll even mail you a
                new pair of pants if you need one.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <NuxtLink href="/contact"
                    class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    Send me a message</NuxtLink>
            </div>
            <svg viewBox="0 0 1024 1024"
                class="absolute left-1/2 top-1/2 -z-10 text-purple-500 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                aria-hidden="true">
                <circle cx="512" cy="512" r="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                    fill-opacity="0.7" />
                <defs>
                    <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                        <stop stop-color="currentColor" />
                        <stop offset="1" stop-color="rgb(249,115,22)" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    </div>

    <BlogPresentation />

    <FootersFooter />
</template>
