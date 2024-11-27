<template>
    <article class="hover:drop-shadow-xl duration-200 hover:ring-2 p-4 hover:bg-dark-400 ring-orange-500 rounded">
        <NuxtLink class="flex flex-col items-start h-full justify-between" :href="`/blog${post.path}`">
            <div class="relative w-full" v-if="post.image">
                <nuxt-img format="webp" width="500" :src="post.image" alt=""
                    class="aspect-[16/9] w-full rounded bg-dark-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
                <div class="absolute inset-0 rounded-2xl ring-1 ring-   inset ring-gray-100/10" />
            </div>
            <div class="max-w-xl h-full flex flex-col">
                <div class="mt-8 flex items-center gap-x-4 text-xs">
                    <time data-allow-mismatch :datetime="post.created_at" class="text-gray-500">{{ formatDate(post.created_at)
                        }}</time>
                </div>
                <div class="group relative">
                    <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-50 group-hover:text-gray-300">
                        {{ post.title }}
                    </h3>
                    <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-300">
                        {{ post.description }}
                    </p>
                </div>
                <div class="mt-auto pt-8 flex items-center gap-x-4">
                    <img :src="post.author.image" alt="" class="h-10 w-10 rounded bg-dark-100" />
                    <div class="text-sm leading-6">
                        <p class="font-semibold text-gray-50">
                            {{ post.author.name }}
                        </p>
                        <p class="text-gray-300">
                            {{ post.author.handle }}
                        </p>
                    </div>
                </div>
            </div>
        </NuxtLink>
    </article>
</template>

<script lang="ts" setup>
import type { Post } from "~/types/posts";

defineProps<{
    post: Post;
}>();

const formatDate = (date?: string) => {
    return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(Date.parse(date ?? new Date().toISOString()));
};
</script>