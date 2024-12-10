<script setup lang="ts">
import type { NuxtError } from "nuxt/app";

const props = defineProps<{
    error: NuxtError;
}>();

console.log(props.error);
</script>

<template>
    <main class="size-full min-h-dvh bg-dark-800">
        <HeadersNavbar />
        <Errors404 v-if="error.statusCode === 404" />
    </main>
</template>
