<script setup lang="tsx">
import Inbox from "~/components/contact/inbox.vue";
import Container from "~/components/containers/big.vue";
import { Card } from "~/components/ui/card";

if (import.meta.server) {
    useSeoMeta({
        title: "Contact",
        ogTitle: "Contact",
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
}

const contactMethods = [
    {
        name: "Signal",
        href: "https://signal.me/#eu/29gu1hAuAfCAifqIvTWNB2u4hmlVvk9VnCEP15r25Hix_8nBBEBEx7OHuTsuemPX",
        icon: (
            <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m3 20l1.3-3.9C1.976 12.663 2.874 8.228 6.4 5.726c3.526-2.501 8.59-2.296 11.845.48c3.255 2.777 3.695 7.266 1.029 10.501S11.659 20.922 7.7 19z"
                />
            </svg>
        ),
    },
    {
        name: "Matrix",
        href: "https://matrix.to/#/@jesse:cpluspatch.dev",
        icon: (
            <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 3H3v18h1m16 0h1V3h-1M7 9v6m5 0v-3.5a2.5 2.5 0 1 0-5 0v.5m10 3v-3.5a2.5 2.5 0 1 0-5 0v.5"
                />
            </svg>
        ),
    },
    {
        name: "Email",
        href: "mailto:contact@cpluspatch.com",
        icon: (
            <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                >
                    <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <path d="m3 7l9 6l9-6" />
                </g>
            </svg>
        ),
    },
    {
        name: "GitHub",
        href: "https://github.com/CPlusPatch",
        icon: (
            <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21"
                />
            </svg>
        ),
    },
];

definePageMeta({
    layout: "navbar-and-footer",
});
</script>

<template>
	<Container class="py-40 flex flex-col gap-20">
		<Inbox />
		<section>
			<div class="mx-auto">
				<h2
					class="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
					How to contact me
				</h2>
				<p class="mt-6 text-lg leading-8 text-secondary-foreground max-w-xl">
					You can contact me through various means, such as Matrix,
					Email or Signal.
				</p>
			</div>
			<div
				class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
				<Card as="a"
					v-for="method in contactMethods"
					:key="method.name"
					:href="method.href"
					target="_blank"
					referrerpolicy="no-referrer"
					class="space-y-4 items-center gap-1">
					<component :is="method.icon"
						class="size-12 text-primary-foreground" />
					<span class="text-primary-foreground font-semibold">
						{{ method.name }}
					</span>
				</Card>
			</div>
		</section>
	</Container>
</template>
