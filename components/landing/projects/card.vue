<template>
	<li
		data-phys="true"
		:class="[
			'hover:drop-shadow-xl h-full pb-16 flex flex-col relative overflow-hidden duration-200 hover:ring-2 p-6 hover:bg-dark-400 hover:ring-orange-500 rounded ring-1 ring-white/10',
		]">
		<nuxt-img
			class="aspect-[3/2] w-full rounded object-cover ring-1 ring-white/10"
			:src="image"
			width="400"
			format="webp"
			alt="" />
		<h3
			class="mt-6 text-xl font-semibold leading-8 text-gray-50 drop-shadow">
			{{ name }}
		</h3>
		<p class="mt-4 text-base leading-7 text-gray-100 drop-shadow-xl">
			{{ description }}
		</p>
		<ul class="flex gap-6 list-none flex-wrap pt-8 mt-auto">
			<li v-for="link in links" :key="link.name" class="!m-0">
				<a
					:href="link.href"
					target="_blank"
					rel="noreferrer"
					class="text-white">
					<LinkIcon class="text-2xl" />
				</a>
			</li>
		</ul>
		<div
			:class="[
				'bg-black h-10 absolute bottom-0 inset-x-0 w-full px-4 py-2 text-center font-semibold text-gray-200',
				featured
					? 'bg-gradient-to-r from-pink-500/70 via-red-500/70 to-yellow-500/70'
					: 'bg-black',
			]">
			{{ featured ? "Featured" : "Project" }}
		</div>
	</li>
</template>

<script lang="ts" setup>
import { LinkIcon } from "lucide-vue-next";

defineProps<{
    name: string;
    description: string;
    image: string;
    featured?: boolean;
    links: {
        name: string;
        icon: string;
        href: string;
    }[];
}>();
</script>
