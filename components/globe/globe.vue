<template>
    <div class="h-dvh w-dvh bg-[url('/globe/stars.jpg')] bg-cover bg-center">
        <div ref="container" class="h-full w-full"></div>
    </div>
</template>

<script lang="ts" setup>
import type { FeatureCollection } from "geojson";
import countries from "~/public/globe/globe-data.json";
import airports from "~/public/globe/my-airports.json";
import flights from "~/public/globe/my-flights.json";
import {
    type AirportData,
    type FlightData,
    GlobeVisualization,
} from "./renderer";

const container = useTemplateRef<HTMLDivElement>("container");
const globe = ref<GlobeVisualization | null>(null);

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

onUnmounted(() => {
    globe.value?.dispose();
});
</script>
