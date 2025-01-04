<template>
    <div class="h-dvh w-dvh bg-[url('/globe/stars.jpg')] bg-cover bg-center">
        <div class="absolute top-2 left-2 flex flex-col gap-1 bg-dark-500 p-2 rounded-md justify-center-center">
            <label for="speed" class="font-semibold text-gray-200 text-xl">Time Scale</label>
            <div class="flex gap-2">
                <input type="number" id="speed" v-model="speed" min="1" max="10000" />
                <button @click="speed = 1" class="bg-gray-800 text-gray-200 px-2 py-1 rounded-md">1x</button>
                <button @click="speed = 100" class="bg-gray-800 text-gray-200 px-2 py-1 rounded-md">100x</button>
                <button @click="speed = 10000" class="bg-gray-800 text-gray-200 px-2 py-1 rounded-md">10 000x</button>
                <button @click="speed = 100000" class="bg-gray-800 text-gray-200 px-2 py-1 rounded-md">100 000x</button>
                <button @click="speed = 1000000" class="bg-gray-800 text-gray-200 px-2 py-1 rounded-md">1 000
                    000x</button>
                <button @click="speed = 10000000" class="bg-gray-800 text-gray-200 px-2 py-1 rounded-md">10 000
                    000x</button>
            </div>
        </div>
        <div class="absolute bottom-2 left-2 flex flex-col gap-1 bg-dark-500 p-2 rounded-md justify-center-center">
            <p class="text-gray-200 font-mono">{{ date.toUTCString() }}</p>
        </div>
        <div class="absolute bottom-2 right-2 flex flex-col gap-1 bg-dark-500 p-2 rounded-md justify-center-center max-w-sm text-sm">
            <p class="text-gray-200 font-mono">Earth rotation and sun position are realistic if you ignore most things about physics and astronomy, and assume that everything started on Jan 1, 1970.</p>

            <a target="_blank" rel="noopener noreferrer" href="https://github.com/CPlusPatch/web-landing/blob/main/components/globe/globe.vue" class="text-gray-200 underline">Source code</a>
        </div>
        <div ref="container" class="h-full w-full"></div>
    </div>
</template>

<script lang="ts" setup>
import type { FeatureCollection } from "geojson";
import countries from "~/public/globe/globe-data.json";
import { GlobeVisualization } from "./renderer";

const container = useTemplateRef<HTMLDivElement>("container");
const globe = ref<GlobeVisualization | null>(null);

const speed = ref(1);
const date = ref(new Date());

onMounted(() => {
    const containerReal = container.value as HTMLDivElement;

    globe.value = new GlobeVisualization({
        container: containerReal,
        width: containerReal.clientWidth,
        height: containerReal.clientHeight,
    });
    globe.value.updateCountries(countries as unknown as FeatureCollection);
    globe.value.updateOrbits([
        {
            apoapsis: 240,
            periapsis: 100,
            inclination: 0,
        },
    ]);
});

watch(speed, (newSpeed) => {
    if (globe.value) {
        globe.value.timeScale = newSpeed;
    }
});

useIntervalFn(() => {
    if (globe.value) {
        date.value = globe.value.currentDate;
    }
}, 100);

onUnmounted(() => {
    globe.value?.dispose();
});
</script>
