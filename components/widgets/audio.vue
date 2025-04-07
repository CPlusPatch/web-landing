<template>
    <div :class="['fixed right-8 bottom-8 bg-dark-700 p-4 ring-1 ring-dark-300 rounded', clicked && 'left-8 sm:left-auto']">
        <button v-if="!clicked" @click="clicked = true" class="p-2 text-gray-200 size-10">
            <Music class="size-6 hover:animate-spin" />
        </button>
        <audio v-else :controls="true" class="rounded w-full" :autoplay="true">
            <source src="/audio/want-you-gone.flac" type="audio/flac">
        </audio>
    </div>
</template>

<script lang="ts" setup>
import { Music } from "lucide-vue-next";

const clicked = ref(false);
</script>