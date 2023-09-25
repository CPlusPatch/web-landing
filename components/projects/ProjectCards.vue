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
	{
		tag: "Application",
		name: "Flavi",
		description:
			"Flavi is an open-source client for the Matrix ecosystem with the goal of having a clean, familiar interface for users of Discord and the like.",
		image: "/images/assets/flavi-screenshot.png",
	},
	{
		tag: "Services",
		name: "CPlusPatch ID",
		description:
			"CPlusPatch ID is a free and open-source identity provider that allows you to log in to websites and applications using your CPlusPatch ID.",
		image: "http://thoughtfullaw.com/wp-content/uploads/2014/05/security.jpg",
	},
	{
		tag: "Services",
		name: "CPlusPatch Cloud",
		description:
			"An open-source cloud provider with a focus on privacy and security. It's based on Nextcloud and is available for free for everyone.",
		image: "https://www.muylinux.com/wp-content/uploads/2020/06/nextcloud.png",
	},
	{
		tag: "Services",
		name: "CPlusPatch Chat",
		description:
			"An open-source Matrix instance, an open network for secure, decentralized communication. Messages are end-to-end encrypted for maximum security.",
		image: "https://matrix.org/blog/img/splash.jpg",
	},
	{
		tag: "Application",
		name: "Fedibase",
		description:
			"Fedibase is a client for the Fediverse allowing you to browse your favourite feeds and interact with them. It's available for any device with a web browser.",
		image: "/images/assets/fedibase-screenshot.png",
	},
	{
		tag: "Application",
		name: "CPlusPatch CMS",
		description:
			"CPlusPatch CMS is a content management system made with Vue, allowing you to create and manage websites with an extensible block-based system.",
		image: "https://github.com/CPlusPatch/web-business/raw/master/assets/readme/devices-editor.webp",
	},
	{
		tag: "Application",
		name: "Lysand",
		description:
			"Lysand is an experimental new ActivityPub microblogging server implementing the Mastodon API, written with the Bun runtime",
		image: "https://opengraph.githubassets.com/0473f3e13c155c834c85ea1188a44fc1191a12fc96220b0acf1301002b15f462/CPlusPatch/lysand",
	},
	{
		tag: "Website",
		name: "KitsuLife",
		description:
			"Website for the Kitsu service suite, showcasing features and the community for Kitsu",
		image: "https://kitsu.life/images/assets/screenshots/screenshot3.png",
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
				class="group flex flex-col h-full shadow hover:shadow-xl rounded overflow-hidden hover:ring-2 hover:ring-orange-500 duration-200 bg-dark-400 ring-1 ring-dark-300">
				<div
					class="h-52 flex flex justify-center items-center overflow-hidden">
					<nuxt-img
						:src="card.image"
						sizes="sm:100vw md:70vw lg:50vw"
						format="webp"
						alt=""
						class="h-full w-full object-cover bg-white/5 backdrop-blur-xl" />
				</div>
				<div class="p-4 md:p-6">
					<span
						class="inline mb-1 text-xs font-semibold text-orange-800 bg-orange-200 px-2 py-1 rounded">
						{{ card.tag }}
					</span>
					<h2
						class="text-lg mt-3 font-semibold text-gray-200 hover:text-white">
						{{ card.name }}
					</h2>
					<p class="mt-2 text-gray-300 text-sm">
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
