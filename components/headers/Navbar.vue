<script setup lang="ts">
const products = [
    {
        name: "Versia",
        description:
            "Highly standardized federation protocol that's easy to use and understand.",
        icon: "tabler:world-www",
        href: "https://versia.pub",
    },
    {
        name: "Versia Server",
        description:
            "Reference implementation of the Versia protocol. Fast, lightweight and configurable.",
        icon: "tabler:server",
        href: "https://github.com/versia-pub/server",
    },
    {
        name: "Join Mastodon",
        description:
            "A landing page for mastodon.de, a social media with no ads, no tracking, and no algorithms. Made with Nuxt.js and Tailwind CSS.",
        icon: "tabler:brand-mastodon",
        href: "https://join-mastodon.de",
    },
    {
        name: "KitsuLife",
        description:
            "Website for the Kitsu service suite, showcasing features and the community for Kitsu.",
        icon: "tabler:social",
        href: "https://kitsu.life",
    },
];

const currentNews = {
    id: "versia4",
    title: "Versia 0.4",
    description: "Versia 0.4 is now available!",
    linkText: "Read the docs",
    href: "https://versia.pub",
};

const open = ref(false);
const closedNews = useLocalStorage<string[]>("closedNews", []);

const hasLocalStorageLoaded = ref(false);

onMounted(() => {
    hasLocalStorageLoaded.value = true;
});
</script>
<template>
    <header :class="[
        'z-10 bg-transparent backdrop-blur-lg',
        'fixed top-0 inset-x-0 bg-dark-800/30',
    ]">
        <div v-if="!closedNews.includes(currentNews.id) && hasLocalStorageLoaded"
            class="relative isolate flex items-center gap-x-6 overflow-hidden bg-dark-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
            <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 w-full">
                <p class="text-sm text-gray-50">
                    <strong class="font-semibold">{{
                        currentNews.title
                        }}</strong>&nbsp;•&nbsp;{{ currentNews.description }}
                </p>
                <a :href="currentNews.href" target="_blank" class="text-sm font-semibold text-gray-50 group">{{
                    currentNews.linkText }}
                    <ButtonsAnimatedArrow />
                </a>
            </div>
            <div class="flex justify-end">
                <button type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                    @click="closedNews.push(currentNews.id)">
                    <span class="sr-only">Dismiss</span>
                    <iconify-icon icon="tabler:x" height="none" class="h-5 w-5 text-gray-50" aria-hidden="true" />
                </button>
            </div>
        </div>
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div class="flex lg:flex-1">
                <NuxtLink href="/" class="-m-1.5 p-1.5">
                    <span class="sr-only">CPlusPatch</span>
                    <nuxt-img class="h-8 w-auto" width="229" height="229" src="/images/icons/logo.svg"
                        alt="CPlusPatch Logo" />
                </NuxtLink>
            </div>
            <div class="flex lg:hidden">
                <button type="button"
                    class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
                    @click="open = true">
                    <span class="sr-only">Open main menu</span>
                    <iconify-icon icon="tabler:menu-2" height="none" class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <HeadlessPopoverGroup class="hidden lg:flex lg:gap-x-12">
                <HeadlessPopover>
                    <HeadlessPopoverButton id="thebutton"
                        class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-50">
                        Projects
                        <iconify-icon icon="tabler:chevron-down" height="none" class="h-5 w-5 flex-none text-gray-500"
                            aria-hidden="true" />
                    </HeadlessPopoverButton>

                    <transition enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition ease-in duration-150"
                        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
                        <HeadlessPopoverPanel
                            class="absolute inset-x-0 top-0 -z-10 bg-dark-700 pt-14 shadow-lg ring-1 ring-dark-900/5">
                            <div class="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
                                <div v-for="item in products" :key="item.name"
                                    class="group relative rounded-lg p-6 text-sm leading-6 hover:bg-dark-400 duration-200 ring-dark-200 hover:ring-1">
                                    <div
                                        class="flex h-11 w-11 items-center justify-center rounded-lg bg-dark-300 duration-200 group-hover:bg-dark-700">
                                        <iconify-icon :icon="item.icon" height="none"
                                            class="h-6 w-6 text-gray-400 group-hover:text-orange-400"
                                            aria-hidden="true" />
                                    </div>
                                    <a target="_blank" :href="item.href" class="mt-6 block font-semibold text-gray-50">
                                        {{ item.name }}
                                        <span class="absolute inset-0" />
                                    </a>
                                    <p class="mt-1 text-gray-300">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </div>
                        </HeadlessPopoverPanel>
                    </transition>
                </HeadlessPopover>

                <NuxtLink href="/blog" class="text-sm font-semibold leading-6 text-gray-50">Blog</NuxtLink>

                <NuxtLink href="/contact" class="text-sm font-semibold leading-6 text-gray-50">Contact</NuxtLink>
            </HeadlessPopoverGroup>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <a target="_blank" href="https://github.com/cpluspatch/web-landing"
                    class="text-sm font-semibold group leading-6 text-gray-50">Source Code
                    <ButtonsAnimatedArrow />
                </a>
            </div>
        </nav>
        <HeadlessDialog as="div" class="lg:hidden" :open="open" @close="open = false">
            <div class="fixed inset-0 z-10"></div>
            <HeadlessDialogPanel
                class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-dark-700 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-dark-50/10">
                <div class="flex items-center justify-between">
                    <NuxtLink href="/" class="-m-1.5 p-1.5">
                        <span class="sr-only">CPlusPatch</span>
                        <nuxt-img class="h-8 w-auto" width="229" height="229" src="/images/icons/logo.svg"
                            alt="CPlusPatch Logo" />
                    </NuxtLink>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-200" @click="open = false">
                        <span class="sr-only">Close menu</span>
                        <iconify-icon icon="tabler:x" height="none" class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-400/10">
                        <div class="space-y-2 py-6">
                            <HeadlessDisclosure v-slot="{ open }" as="div" class="-mx-3">
                                <HeadlessDisclosureButton
                                    class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-50 hover:bg-dark-500">
                                    Projects
                                    <iconify-icon icon="tabler:chevron-down" height="none" :class="[
                                        open ? '-scale-y-100' : '',
                                        'h-5 w-5 flex-none duration-200',
                                    ]" aria-hidden="true" />
                                </HeadlessDisclosureButton>
                                <HeadlessDisclosurePanel class="mt-2 space-y-2">
                                    <HeadlessDisclosureButton v-for="item in [...products]" :key="item.name" as="a"
                                        :href="item.href"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-50 hover:bg-dark-300">
                                        {{
                                            item.name
                                        }}</HeadlessDisclosureButton>
                                </HeadlessDisclosurePanel>
                            </HeadlessDisclosure>
                            <NuxtLink href="/blog"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-50 hover:bg-dark-500">
                                Blog</NuxtLink>
                            <NuxtLink href="/contact"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-50 hover:bg-dark-500">
                                Contact</NuxtLink>
                        </div>
                        <div class="py-6">
                            <a target="_blank" href="https://github.com/cpluspatch/web-landing"
                                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-50 hover:bg-dark-500">Source
                                Code</a>
                        </div>
                    </div>
                </div>
            </HeadlessDialogPanel>
        </HeadlessDialog>
    </header>
</template>
