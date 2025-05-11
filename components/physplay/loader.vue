<template>
    <div class="px-4 md:px-6 py-24 mx-auto max-w-7xl">
        <div
            class="px-6 h-48 md:h-72 max-w-2xl lg:max-w-none mx-auto flex items-center justify-center bg-dark-700 ring-1 ring-white/10 rounded-lg relative isolate overflow-hidden">
            <button v-if="!clicked" @click="clicked = true"
                class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Click to load surprise</button>
            <LazyPhysplay v-else />
        </div>
    </div>
</template>

<script lang="ts" setup>
const clicked = ref(false);
</script>