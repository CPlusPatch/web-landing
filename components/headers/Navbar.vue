<script setup lang="ts">
import {
    ChevronDown,
    Globe,
    Menu,
    MessagesSquare,
    Network,
    Server,
    X,
} from "lucide-vue-next";

const products = [
    {
        name: "Versia",
        description:
            "Highly standardized federation protocol that's easy to use and understand.",
        icon: Network,
        href: "https://versia.pub",
    },
    {
        name: "Versia Server",
        description:
            "Reference implementation of the Versia protocol. Fast, lightweight and configurable.",
        icon: Server,
        href: "https://github.com/versia-pub/server",
    },
    {
        name: "Join Mastodon",
        description:
            "A landing page for mastodon.de, a social media with no ads, no tracking, and no algorithms. Made with Nuxt.js and Tailwind CSS.",
        icon: Globe,
        href: "https://join-mastodon.de",
    },
    {
        name: "KitsuLife",
        description:
            "Website for the Kitsu service suite, showcasing features and the community for Kitsu.",
        icon: MessagesSquare,
        href: "https://kitsu.life",
    },
];

const open = ref(false);
</script>
<template>
    <header data-phys="true" :class="[
        'z-10 backdrop-blur-lg fixed top-0 inset-x-0 bg-dark-800/30',
    ]">
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
                    <Menu height="none" class="size-6" />
                </button>
            </div>
            <HeadlessPopoverGroup class="hidden lg:flex lg:gap-x-12">
                <HeadlessPopover>
                    <HeadlessPopoverButton id="thebutton"
                        class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-50">
                        Projects
                        <ChevronDown class="size-5 flex-none text-gray-500" />
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
                                        class="flex size-11 items-center justify-center rounded-lg bg-dark-300 duration-200 group-hover:bg-dark-700">
                                        <component :is="item.icon"
                                            class="size-6 text-gray-400 group-hover:text-orange-400" />
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
                        <X class="size-6" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-400/10">
                        <div class="space-y-2 py-6">
                            <HeadlessDisclosure v-slot="{ open }" as="div" class="-mx-3">
                                <HeadlessDisclosureButton
                                    class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-50 hover:bg-dark-500">
                                    Projects
                                    <ChevronDown :class="[
                                        open ? '-scale-y-100' : '',
                                        'size-5 flex-none duration-200',
                                    ]" />
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
