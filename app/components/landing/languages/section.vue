<script setup lang="ts">
import Language from "./language.vue";
import { languages } from "./languages";

const { width } = useWindowSize();

const groupCount = computed(() => (width.value < 900 ? 5 : 3));

// Function to separate these languages into 3 equally sized groups, then return the nth group
const getGroup = (n: number) => {
    const groupSize = Math.ceil(languages.length / groupCount.value);
    const start = groupSize * n;
    const end = start + groupSize;
    return languages.slice(start, end);
};
</script>

<template>
    <section class="flex flex-col gap-3 overflow-hidden py-4                                ">
        <div v-for="group of groupCount" :key="group" :class="[
            'flex flex-row gap-4 w-full shrink-0 min-w-full px-4',
            group % 2 === 1
                ? 'animate-scroll-left'
                : 'animate-scroll-right',
        ]">
            <Language v-for="system of getGroup(group - 1)" :key="system.name" :system="system" />
        </div>
    </section>
</template>