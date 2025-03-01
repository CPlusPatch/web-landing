<script setup lang="ts">
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { watchOnce } from "@vueuse/core";
import { ref } from "vue";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { projects } from "./data";

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
    if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
    selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
    emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
    if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
    emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
    if (!emblaMainApi) return;

    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
});
</script>

<template>
    <div class="w-full flex gap-2 flex-col">
        <Carousel class="relative w-full" @init-api="(val) => emblaMainApi = val">
            <CarouselContent class="items-center">
                <CarouselItem v-for="project in projects" :key="project.name">
                    <Card class="p-0 shadow-xl relative">
                        <CardContent>
                            <img :src="project.image" class="w-full object-cover rounded-lg" alt="" />
                        </CardContent>
                        <!-- Shadow overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t to-50% from-black/80 to-transparent" />
                        <CardHeader class="p-8 absolute bottom-0 inset-x-0">
                            <CardTitle>{{ project.name }}</CardTitle>
                            <CardDescription>{{ project.description }}</CardDescription>
                        </CardHeader>
                    </Card>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

        <Carousel class="relative w-full" @init-api="(val) => emblaThumbnailApi = val">
            <CarouselContent class="flex gap-4 ml-0 items-center">
                <CarouselItem v-for="(project, index) in projects" :key="project.name" class="pl-0 basis-1/6 cursor-pointer"
                    @click="onThumbClick(index)">
                    <Card class="p-0">
                        <CardContent>
                            <img :src="project.image" class="w-full object-cover rounded-lg" alt="" />
                        </CardContent>
                    </Card>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </div>
</template>