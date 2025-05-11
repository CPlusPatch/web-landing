<script setup lang="ts">
import Container from "~/components/containers/big.vue";
import Card from "./card.vue";
import Graphics from "./graphics.vue";

const { data: posts } = await useAsyncData(() =>
    queryCollection("content").all(),
);

const isJesse = useJesse();
</script>

<template>
    <section>
        <Container>
        <div
            class="h-48 md:h-72 max-w-2xl lg:max-w-none mx-auto flex items-center justify-center bg-dark-700 ring-1 ring-white/10 rounded-lg relative isolate overflow-hidden">
            <Graphics />
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-6xl">
                My articles
            </h2>
        </div>
        <div v-if="posts && posts.length > 0"
            class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <Card v-for="post in posts" :key="post.title" :post="post"
                :class="post.private && !isJesse && 'hidden'" />
        </div>
        <div v-else class="mx-auto mt-16 text-center">
            <p class="text-gray-300">No posts yet.</p>
        </div>
    </Container>
    </section>
</template>
