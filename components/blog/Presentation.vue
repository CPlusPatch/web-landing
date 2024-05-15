<script setup lang="ts">
import type { Post } from "~/types/posts";

const { data } = await useFetch<Post[]>("/api/articles");

const posts = ref(data.value?.filter((p) => !p.private) ?? []);

if (import.meta.prerender) {
    // Show all posts during prerendering so that their images are fetched
    posts.value = data.value ?? [];
}

const { j_e_s_e } = useMagicKeys();

watchEffect(() => {
    if (j_e_s_e.value) {
        posts.value = data.value ?? [];
    }
});
</script>

<template>
    <div class="px-4 md:px-6 py-24 mx-auto max-w-7xl">
        <div
            class="px-6 h-48 md:h-72 max-w-2xl lg:max-w-none mx-auto flex items-center justify-center bg-dark-700 ring-1 ring-white/10 rounded-lg relative isolate overflow-hidden">
            <svg class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true">
                <defs>
                    <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1"
                        patternUnits="userSpaceOnUse">
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
                    <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                        stroke-width="0" />
                </svg>
                <rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
            </svg>
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-6xl">
                My articles
            </h2>
        </div>
        <div v-if="posts.length > 0"
            class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <BlogCard v-for="post in posts" :key="post.title" :post="post" />

        </div>
        <div v-else class="mx-auto mt-16 text-center">
            <p class="text-gray-300">No posts yet.</p>
        </div>
    </div>
</template>
