<script setup lang="ts">
import type { Post } from "~/types/posts";

const filePath = (useRoute().params.path as string[]).join("/");

const { data: post } = await useFetch<Post>(
    `/api/article?path=${encodeURIComponent(`/${filePath}`)}`,
);

if (!post.value) {
    throw createError({
        statusCode: 404,
        message: "Post not found",
    });
}

useSchemaOrg([
    defineArticle({
        author: post.value.author.name,
        datePublished: post.value.created_at,
        image: post.value.image,
        description: post.value.description,
        inLanguage: "en-US",
        thumbnailUrl: post.value.image,
    }),
]);

useServerSeoMeta({
    title: post.value.title,
    ogTitle: post.value.title,
    author: post.value.author.name,
    description: post.value.description,
    ogDescription: post.value.description,
    ogImage: post.value.image,
    twitterCard: "summary_large_image",
});

let body = post.value.content;
// Fix for optimizing images during prerendering
const img = useImage();

// Find all links of type /_ipx/ in body
const ipxLinks = body.match(/\/_ipx\/[^"]+/g) || [];

for (const ipxLink of ipxLinks) {
    body = body.replace(
        ipxLink,
        // Replace the link with the optimized image
        img(`/${ipxLink.split("/").slice(3).join("/")}` || "", {
            width: 800,
            format: "webp",
        }),
    );
}

const formatDate = (date?: string) => {
    return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }).format(Date.parse(date ?? new Date().toISOString()));
};
</script>

<template>
    <HeadersNavbar />

    <div v-if="post" class="mx-auto max-w-7xl pb-24 sm:pb-32 px-6 lg:px-8 pt-1">
        <div class="mx-auto max-w-2xl text-center mt-40">
            <h1 v-if="post.title" class="text-4xl font-bold tracking-tight text-gray-50 sm:text-5xl">
                {{ post.title }}
            </h1>

            <div class="mt-8 mx-auto">
                <time v-if="post.created_at" :datetime="post.created_at" class="text-gray-500">{{
        formatDate(post.created_at) }}</time>
            </div>
        </div>
        <nuxt-img v-if="post.image" :src="post.image" width="800" format="webp" alt=""
            class="aspect-[16/9] drop-shadow-2xl mt-20 w-full max-w-3xl mx-auto rounded bg-dark-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
        <article
            class="mx-auto max-w-3xl prose prose-invert mt-10 content prose-code:before:content-none prose-code:after:content-none prose-a:text-orange-500 prose-a:underline"
            v-html="body"></article>
    </div>

    <FootersFooter />
</template>

<style lang="postcss">
.content h1,
.content h2,
.content h3,
.content h4,
.content h5 {
    scroll-margin-top: 8rem;
    @apply block relative;
}

.content img {
    @apply rounded bg-dark-50 ring-1 ring-white/5 mx-auto;
}

.content figure figcaption img {
    @apply h-6 w-6 flex-none rounded-full bg-dark-50;
}

.content .header-anchor {
    /* Replace with a link emoji, make it hang on the left of the text outside the parent */
    @apply no-underline absolute bottom-0 w-16 md:w-auto text-right left-[calc(100%-3.75rem)] md:-left-10 text-gray-50 opacity-100 bg-dark-800;
}

.content .header-anchor::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='1.5em' width='1.5em' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23c5c5d2' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.068 5.068 0 0 1-7.127 0a4.972 4.972 0 0 1 0-7.071L6 11'/%3E%3C/svg%3E");
    @apply text-gray-50 visible;
}

.content ul li input[type="checkbox"],
.content ol li input[type="checkbox"] {
    @apply rounded text-orange-500 mb-0 mt-0 mr-3;
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
    @apply ring-1 ring-white/10 mt-4 bg-white/5 px-4 py-3 rounded;
}


.content pre code {
    @apply block p-0;
}

.content code:not(pre code) {
    @apply rounded px-2 py-1 ring-1 ring-white/10 bg-white/5;
}
</style>
