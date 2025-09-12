<script setup lang="ts">
import {
    ChevronDown,
    ExternalLink,
    Globe,
    Menu,
    MessagesSquare,
    Network,
    Server,
    X,
} from "lucide-vue-next";
import { NuxtLink } from "#components";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "../ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";

const projects = [
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
        name: "JoinMastodon",
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
    <NavigationMenu as="header" data-phys="true" class="z-10 backdrop-blur-lg fixed top-0 inset-x-0 max-w-full *:w-full">
        <Sheet>
            <NavigationMenuList as="nav"
                class="max-w-7xl mx-auto w-full grid grid-cols-[auto_auto] lg:grid-cols-[1fr_repeat(3,auto)_1fr] gap-6 items-center justify-between p-4 lg:px-8">
                <NavigationMenuItem class="mr-auto">
                    <NuxtLink v-slot="{ isActive, href, navigate }" to="/" custom>
                        <NavigationMenuLink :active="isActive" :href="href" @click="navigate">
                            <span class="sr-only">CPlusPatch</span>
                            <nuxt-img class="size-8" src="/images/icons/logo.svg" alt="CPlusPatch Logo" />
                        </NavigationMenuLink>
                    </NuxtLink>
                </NavigationMenuItem>


                <NavigationMenuItem class="hidden lg:block">
                    <NavigationMenuTrigger>
                        Projects
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <ul class="grid grid-cols-2 xl:grid-cols-4 gap-4 w-screen max-w-xl xl:max-w-7xl">
                            <NavigationMenuLink :href="item.href" v-for="item in projects" :key="item.name"
                                class="p-4 group flex flex-col gap-2">
                                <div class="mb-2">
                                    <component :is="item.icon" class="size-6 text-secondary-foreground" />
                                </div>
                                <h2 class="font-semibold text-secondary-foreground">
                                    {{ item.name }}
                                </h2>
                                <p class="text-muted-foreground">
                                    {{ item.description }}
                                </p>
                            </NavigationMenuLink>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem class="hidden lg:block">
                    <NuxtLink v-slot="{ isActive, href, navigate }" to="/blog" custom>
                        <NavigationMenuLink :active="isActive" :href="href" :class="navigationMenuTriggerStyle()"
                            @click="navigate">
                            Blog
                        </NavigationMenuLink>
                    </NuxtLink>
                </NavigationMenuItem>

                <NavigationMenuItem class="hidden lg:block">
                    <NuxtLink v-slot="{ isActive, href, navigate }" to="/contact" custom>
                        <NavigationMenuLink :active="isActive" :href="href" :class="navigationMenuTriggerStyle()"
                            @click="navigate">
                            Contact
                        </NavigationMenuLink>
                    </NuxtLink>
                </NavigationMenuItem>

                <NavigationMenuItem class="ml-auto hidden lg:block">
                    <NuxtLink v-slot="{ isActive, href, navigate }" to="https://github.com/cpluspatch/web-landing"
                        external custom>
                        <NavigationMenuLink :active="isActive" :href="href" :class="navigationMenuTriggerStyle()"
                            @click="navigate">
                            Source Code
                            <ExternalLink class="size-4" />
                        </NavigationMenuLink>
                    </NuxtLink>
                </NavigationMenuItem>

                <SheetTrigger as-child>
                    <Button class="lg:hidden" size="icon" variant="ghost" @click="open = true"
                        aria-label="Open main menu">
                        <Menu class="size-6" />
                    </Button>
                </SheetTrigger>
            </NavigationMenuList>

            <SheetContent class="px-2 py-6 w-full max-w-md">
                <NuxtLink href="/" class="mx-4">
                    <span class="sr-only">CPlusPatch</span>
                    <nuxt-img class="size-8" src="/images/icons/logo.svg" alt="CPlusPatch Logo" />
                </NuxtLink>
                <NavigationMenuList as="nav" class="flex-col items-start *:w-full *:*:w-full *:*:justify-start">
                    <Collapsible v-slot="{ open }" >
                        <CollapsibleTrigger :class="navigationMenuTriggerStyle()">
                            Projects
                            <ChevronDown :class="[
                                open ? '-rotate-180' : '',
                                'size-5 duration-200 ml-auto',
                            ]" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <ul class="flex flex-col ml-4 border-l border-border">
                                <NavigationMenuLink :href="item.href" v-for="item in projects" :key="item.name">{{ item.name }}
                                </NavigationMenuLink>
                            </ul>
                        </CollapsibleContent>
                    </Collapsible>

                    <NavigationMenuItem>
                        <NuxtLink v-slot="{ isActive, href, navigate }" to="/blog" custom>
                            <NavigationMenuLink :active="isActive" :href="href" :class="navigationMenuTriggerStyle()"
                                @click="navigate">
                                Blog
                            </NavigationMenuLink>
                        </NuxtLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NuxtLink v-slot="{ isActive, href, navigate }" to="/contact" custom>
                            <NavigationMenuLink :active="isActive" :href="href" :class="navigationMenuTriggerStyle()"
                                @click="navigate">
                                Contact
                            </NavigationMenuLink>
                        </NuxtLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NuxtLink v-slot="{ isActive, href, navigate }" to="https://github.com/cpluspatch/web-landing"
                            external custom>
                            <NavigationMenuLink :active="isActive" :href="href" :class="navigationMenuTriggerStyle()"
                                @click="navigate">
                                Source Code
                                <ExternalLink class="size-4" />
                            </NavigationMenuLink>
                        </NuxtLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </SheetContent>
        </Sheet>
    </NavigationMenu>
</template>
