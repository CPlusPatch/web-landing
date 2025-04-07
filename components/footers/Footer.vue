<script setup lang="ts">
import { Github } from "lucide-vue-next";

const footerNavigation = {
    solutions: [
        { name: "Mastodon.de", href: "https://mastodon.de" },
        { name: "Versia", href: "https://versia.pub" },
    ],
    legal: [{ name: "Privacy", href: "/privacy" }],
    social: [
        {
            name: "GitHub",
            href: "https://github.com/CPlusPatch/",
            icon: Github,
        },
    ],
};

const friends88x31: {
    name: string;
    link: string;
    src: string;
    steal?: boolean;
}[] = [
    {
        name: "Alex",
        link: "https://gra.phite.ro",
        src: "https://sophari.org/img/buttons/alex.png",
        steal: true,
    },
    {
        name: "Astrid Yu",
        link: "https://astrid.tech",
        src: "https://s3.us-west-000.backblazeb2.com/nyaabucket/a313cf12a8c46d0262c69cdf8a3accc3b6a2d159b8e1211b7abe30886a212884/astriddottech.png",
    },
    {
        name: "Lily",
        link: "https://lunahd.neocities.org/",
        src: "https://lunahd.neocities.org/assets/88x31/me.png",
    },
    {
        name: "Sophari",
        link: "https://sophari.org",
        src: "https://sophari.org/img/sophari.gif",
    },
    {
        name: "Yassie",
        link: "https://labyrinth.zone/@yassie_j",
        src: "https://lunahd.neocities.org/assets/88x31/yassie.gif",
        steal: true,
    },
    {
        name: "Lexi",
        link: "https://softkittypa.ws",
        src: "https://softkittypa.ws/assets/buttons/softkittypaws.png",
    },
    {
        name: "Ari",
        link: "https://ari.lt",
        src: "https://ari.lt/badge.png",
    },
    {
        name: "Nexy",
        link: "https://nexy7574.co.uk",
        src: "https://nexy7574.co.uk/88x31s/nexy7574-new.gif",
    },
    {
        name: "June",
        link: "https://f.dog",
        src: "https://f.dog/~strawberry/june_88x31.png",
    },
];
</script>

<template>
	<footer class="bg-dark-400 z-1" aria-labelledby="footer-heading">
		<h2 id="footer-heading" class="sr-only">Footer</h2>
		<div
			class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
			<div class="xl:grid xl:grid-cols-3 xl:gap-8">
				<div class="space-y-8">
					<nuxt-img
						class="h-7 w-auto"
						width="229"
						height="229"
						src="/images/icons/logo.svg"
						alt="CPlusPatch" />
					<p class="text-sm leading-6 text-gray-300">
						This was a triumph<br />
						I'm making a note here<br />
						Huge success
					</p>
					<div class="flex space-x-6">
						<a
							v-for="item in footerNavigation.social"
							:key="item.name"
							:href="item.href"
							:title="item.name"
							target="_blank"
							class="text-gray-500 hover:text-gray-400">
							<span class="sr-only">{{ item.name }}</span>
							<component :is="item.icon" class="size-5" />
						</a>
					</div>
				</div>
				<div
					class="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 xl:col-span-2 xl:mt-0">
					<div>
						<h3 class="text-sm font-semibold leading-6 text-white">
							Projects
						</h3>
						<ul class="mt-6 space-y-4">
							<li
								v-for="item in footerNavigation.solutions"
								:key="item.name">
								<a
									target="_blank"
									:href="item.href"
									class="text-sm leading-6 text-gray-300 hover:text-white"
									>{{ item.name }}</a
								>
							</li>
						</ul>
					</div>
					<div class="mt-10 md:mt-0">
						<h3 class="text-sm font-semibold leading-6 text-white">
							Legal
						</h3>
						<ul class="mt-6 space-y-4">
							<li
								v-for="item in footerNavigation.legal"
								:key="item.name">
								<a
									target="_blank"
									:href="item.href"
									class="text-sm leading-6 text-gray-300 hover:text-white"
									>{{ item.name }}</a
								>
							</li>
						</ul>
					</div>
					<div class="mt-10 md:mt-0">
						<h3 class="text-sm font-semibold leading-6 text-white">
							Assets
						</h3>
						<ul class="mt-6 space-y-4">
							<li>
								<img
									src="/images/icons/88x31.png"
									alt="The text 'Jesse' overlaid on a dark rectangle with rainbow stripes on the top left. A small drawn character is present on the left."
									title="My 88x31 icon"
									class="[image-rendering:pixelated]" />
								<p
									class="text-xs leading-6 mt-2 text-gray-400 max-w-48">
									Please hotlink this image instead of
									reuploading it.<br />
									<br />
									Alt text included.
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
				<p class="text-xs leading-5 text-gray-400">
					&copy; {{ new Date().getFullYear() }} Gaspard Wierzbinski.
					Licensed under AGPLv3
				</p>

				<div class="flex flex-row gap-2 flex-wrap justify-start mt-4">
					<a
						v-for="item in friends88x31"
						:key="item.name"
						:href="item.link"
						target="_blank"
						rel="noopener noreferrer nofollow"
						class="duration-200 hover:ring-2 hover:ring-orange-500 hover:animate-wiggle">
						<img
							:src="item.src"
							:alt="item.name"
							:title="item.name"
							width="88"
							height="33"
							class="[image-rendering:pixelated]" />
					</a>
				</div>
			</div>
		</div>
		<div
			class="px-4 py-4 text-gray-100 text-sm block bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
			<div class="mx-auto max-w-7xl text-center w-full">
				A site by <strong class="font-semibold">CPlusPatch</strong>
			</div>
		</div>
	</footer>
</template>
