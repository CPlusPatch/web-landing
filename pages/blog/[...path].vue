<script setup lang="ts">
import { marked } from "marked";

const filePath = (useRoute().params.path as string[]).join("/");

const { data } = await useFetch(
	`/api/article?path=${encodeURIComponent("/" + filePath)}`
);

const frontMatter = data.value?.headers;

useSchemaOrg([
	defineArticle({
		author: frontMatter?.author,
		datePublished: frontMatter?.created_at,
		image: frontMatter?.title,
		description: frontMatter?.description,
		inLanguage: frontMatter?.value,
		thumbnailUrl: frontMatter?.image,
	}),
]);

useServerSeoMeta({
	title: frontMatter?.title,
	description: frontMatter?.description,
	ogImage: frontMatter?.image,
	twitterCard: "summary_large_image",
});
</script>

<template>
	<HeadersNavbar />

	<div
		v-if="frontMatter && data?.body"
		class="mx-auto max-w-7xl pb-24 sm:pb-32 px-6 lg:px-8 pt-30">
		<div class="mx-auto max-w-2xl text-center mt-40">
			<h1
				v-if="frontMatter.title"
				class="text-4xl font-bold tracking-tight text-gray-50 sm:text-5xl">
				{{ frontMatter.title }}
			</h1>

			<div class="mt-8 mx-auto">
				<time
					v-if="frontMatter.created_at"
					:datetime="frontMatter.created_at"
					class="text-gray-500"
					>{{
						Intl.DateTimeFormat(undefined, {
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "numeric",
							minute: "numeric",
						}).format(new Date(Number(frontMatter.created_at)))
					}}</time
				>
			</div>
		</div>
		<img
			v-if="frontMatter.image"
			:src="frontMatter.image"
			alt=""
			class="aspect-[16/9] mt-20 w-full max-w-3xl mx-auto rounded-2xl bg-dark-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
		<div class="mx-auto max-w-3xl content" v-html="marked(data.body)"></div>
	</div>
	<Errors404 v-else />
</template>

<style>
.content {
	--at-apply: "mt-16 text-base leading-7 text-gray-200";
}

.content h1 {
	--at-apply: "mt-12 text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl";
}

.content h2 {
	--at-apply: "mt-12 text-2xl font-bold tracking-tight text-gray-50";
}

.content h3 {
	--at-apply: "mt-10 text-xl font-bold tracking-tight text-gray-50";
}

.content h4 {
	--at-apply: "mt-8 text-lg font-bold tracking-tight text-gray-50";
}

.content h5 {
	--at-apply: "mt-8 text-base font-bold tracking-tight text-gray-50";
}

.content figure {
	--at-apply: "mt-10 border-l border-orange-600 pl-9";
}

.content figure > img {
	--at-apply: "aspect-video rounded-xl bg-dark-50 object-cover";
}

.content figure figcaption {
	--at-apply: "mt-6 flex gap-x-4";
}

.content figure figcaption img {
	--at-apply: "h-6 w-6 flex-none rounded-full bg-dark-50";
}

.content blockquote {
	--at-apply: "font-semibold text-gray-50";
}

.content p {
	--at-apply: mt-6;
}

.content strong {
	--at-apply: font-semibold text-gray-50;
}

.content ul,
.content ol {
	--at-apply: mt-8 max-w-xl space-y-3 text-gray-300 pl-5 list-disc;
}

.content ul li input[type="checkbox"],
.content ol li input[type="checkbox"] {
	--at-apply: "rounded text-orange-500 mb-1 mr-1";
}

.content a {
	--at-apply: "text-orange-500 underline";
}

.content pre:has(code) {
	word-wrap: normal;
	background: transparent;
	-webkit-hyphens: none;
	hyphens: none;
	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;
	white-space: pre;
	word-break: normal;
	word-spacing: normal;
	overflow-x: auto;
	--at-apply: "ring-1 ring-white/10 mt-4 bg-white/5 px-4 py-3 rounded";
}

.content pre code {
	--at-apply: "block";
}

.content code:not(pre code) {
	--at-apply: "rounded px-2 py-1 ring-1 ring-white/10 bg-white/5";
}

.content img {
	--at-apply: "my-10 rounded-lg bg-dark-100 ring-1 ring-white/10 mx-auto";
}
</style>
