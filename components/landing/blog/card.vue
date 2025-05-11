<template>
    <article data-phys="true" class="hover:drop-shadow-xl duration-200 hover:ring-2 p-4 hover:bg-dark-400 ring-orange-500 rounded-sm">
        <NuxtLink class="flex flex-col items-start h-full justify-between" :href="`/blog${post.path}`">
            <div class="relative w-full" v-if="post.image">
                <nuxt-img format="webp" width="500" :src="post.image" alt=""
                    class="aspect-video w-full rounded-sm bg-dark-100 object-cover sm:aspect-2/1 lg:aspect-3/2" />
                <div class="absolute inset-0 rounded-2xl ring-1 ring-   inset ring-gray-100/10" />
            </div>
            <div class="max-w-xl h-full flex flex-col">
                <div v-if="post.created_at" class="mt-8 flex items-center gap-x-4 text-xs">
                    <time data-allow-mismatch :datetime="new Date(post.created_at).toISOString()" class="text-gray-500">{{ formatDate(post.created_at)
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
                    <img src="/images/avatars/jessew.png" alt="" class="size-10 rounded-sm bg-dark-100" />
                    <div class="text-sm leading-6">
                        <p class="font-semibold text-gray-50">
                            Jesse W
                        </p>
                        <p class="text-gray-300">
                            @CPlusPatch
                        </p>
                    </div>
                </div>
            </div>
        </NuxtLink>
    </article>
</template>

<script lang="ts" setup>
import type { ContentCollectionItem } from "@nuxt/content";

defineProps<{
    post: ContentCollectionItem;
}>();

const formatDate = (date: number) => {
    return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date));
};
</script>