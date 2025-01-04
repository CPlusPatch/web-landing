<template>
    <div class="h-dvh w-dvh bg-[url('/globe/stars.jpg')] bg-cover bg-center">
        <div class="absolute top-2 left-2 flex flex-col gap-1 bg-dark-500 p-2 rounded-md justify-center-center">
            <label for="speed" class="font-semibold text-gray-200 text-xl">Time Scale</label>
            <p class="text-gray-200">1x is real time</p>
            <input type="number" id="speed" v-model="speed" min="1" max="10000" />
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

onUnmounted(() => {
    globe.value?.dispose();
});
</script>
