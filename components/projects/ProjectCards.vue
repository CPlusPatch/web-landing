<script setup lang="ts">
const cards = [
	{
		tag: "Website",
		description:
			"A landing page for mastodon.de, a social media with no ads, no tracking, and no algorithms. Made with Nuxt.js and Tailwind CSS.",
		name: "join-mastodon.de",
		image: "/images/assets/join-mastodon.de_en.webp",
	},
	{
		tag: "Application",
		description:
			"Fully-featured AI application with a community API, a web interface and a working RP mode, ready for business.",
		name: "AIP",
		image: "https://aip.cpluspatch.dev/images/screenshots/screenshot1.webp",
	},
];
</script>

<template>
	<!-- Card Blog -->
	<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
		<h1 class="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
			My projects
		</h1>
		<!-- Grid -->
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-15">
			<!-- Card -->
			<div
				v-for="card of cards"
				:key="card.name"
				class="group flex flex-col h-full shadow-sm rounded-xl overflow-hidden hover:ring-2 hover:ring-orange-500 duration-200 bg-dark-400 ring-1 ring-dark-300">
				<div
					class="h-52 flex flex justify-center items-center overflow-hidden">
					<img :src="card.image" class="h-full w-full object-cover" />
				</div>
				<div class="p-4 md:p-6">
					<span
						class="inline mb-1 text-xs font-semibold text-orange-800 bg-orange-200 px-2 py-1 rounded-full">
						{{ card.tag }}
					</span>
					<h3
						class="text-xl mt-2 font-semibold text-gray-200 hover:text-white">
						{{ card.name }}
					</h3>
					<p class="mt-2 text-gray-300">
						{{ card.description }}
					</p>
				</div>
			</div>
			<!-- End Card -->
		</div>
		<!-- End Grid -->
	</div>
	<!-- End Card Blog -->
</template>
