<script setup lang="ts">
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
    <section class="flex flex-col gap-3 overflow-hidden">
        <div v-for="group of groupCount" :key="group" :class="[
            'flex flex-row gap-4 w-full shrink-0 min-w-full px-4',
            group % 2 === 1
                ? 'animate-[scrollLeft_40s_linear_infinite]'
                : 'animate-[scrollRight_20s_linear_infinite]',
        ]">
            <div data-phys="true" v-for="system of getGroup(group - 1)" :key="system.id"
                class="flex w-72 bg-dark-200 shrink-0 divide-x divide-dark-300 ring-dark-300 rounded shadow ring-1 duration-200 hover:scale-[102%] no-bad-scale hover:shadow-2xl hover:ring-2 hover:ring-orange-500">
                <iconify-icon height="none" :icon="system.image" :class="[
                    'object-contain rounded-sm duration-150 aspect-1 flex flex-shrink-0',
                    system.padding ? 'm-2 sm:size-[calc(6rem-1rem)] size-[calc(5rem-1rem)]' : 'size-20 sm:size-24',
                ]" />
                <div class="flex flex-col h-full flex-1 justify-center items-start truncate bg-dark-400 p-4">
                    <h3 data-placeholder="Element name" class="text-lg font-bold text-gray-50">
                        {{ system.name }}
                    </h3>
                    <p data-placeholder="Element subtitle" class="text-gray-400">
                        {{ system.experience }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
@keyframes scrollLeft {

    0%,
    100% {
        transform: translate3d(0, 0, 0);
    }

    50% {
        transform: translate3d(-50%, 0, 0);
    }
}

@keyframes scrollRight {

    0%,
    100% {
        transform: translate3d(-50%, 0, 0);
    }

    50% {
        transform: translate3d(0, 0, 0);
    }
}
</style>
