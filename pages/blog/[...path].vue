<script setup lang="ts">
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
	ogTitle: frontMatter?.title,
	author: frontMatter?.author,
	description: frontMatter?.description,
	ogDescription: frontMatter?.description,
	ogImage: frontMatter?.image,
	twitterCard: "summary_large_image",
});
const { $mdRenderer } = useNuxtApp();
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
		<div
			class="mx-auto max-w-3xl content"
			v-html="$mdRenderer.render(data.body)"></div>
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

.content h1,
.content h2,
.content h3,
.content h4,
.content h5 {
	scroll-margin-top: 8rem;
	--at-apply: "block relative";
}

.content figure {
	--at-apply: "mt-10";
}

.content figure > img {
	--at-apply: "rounded-xl bg-dark-50 ring-1 ring-white/10 mx-auto";
}

.content figure figcaption {
	--at-apply: "mt-2 text-center text-gray-300 text-sm w-full";
}

.content figure figcaption img {
	--at-apply: "h-6 w-6 flex-none rounded-full bg-dark-50";
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

.content .header-anchor {
	/* Replace with a link emoji, make it hang on the left of the text outside the parent */
	--at-apply: "no-underline absolute bottom-0 w-15 md:w-auto text-right left-[calc(100%-3.75rem)] md:-left-10 text-gray-50 opacity-100 bg-gradient-to-r from-transparent to-40% to-dark-800";
}

.content .header-anchor::before {
	content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='1.5em' width='1.5em' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23c5c5d2' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.068 5.068 0 0 1-7.127 0a4.972 4.972 0 0 1 0-7.071L6 11'/%3E%3C/svg%3E");
	--at-apply: "text-gray-50 visible";
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
	--at-apply: "block p-0";
}

.content code:not(pre code) {
	--at-apply: "rounded px-2 py-1 ring-1 ring-white/10 bg-white/5";
}

.content img {
	--at-apply: "my-10 rounded-lg bg-dark-100 ring-1 ring-white/10 mx-auto";
}

.content blockquote {
	--at-apply: "mt-10 border-l border-orange-600 pl-9";
}

.content blockquote p {
	--at-apply: "mt-4 text-gray-50 italic";
}
</style>
