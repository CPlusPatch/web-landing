<template>
    <Card class="min-w-72 p-0 grid grid-cols-[auto_1fr] gap-0 overflow-hidden">
        <nuxt-img :src="system.image" :alt="`${system.name} logo`" :class="[
            'object-contain rounded-xs duration-150 aspect-1',
            system.padding ? 'm-2 sm:size-[calc(6rem-1rem)] size-[calc(5rem-1rem)]' : 'size-20 sm:size-24',
        ]" />
        <div class="flex flex-col h-full justify-center items-start truncate bg-background p-4">
            <h3 class="text-lg font-bold">
                {{ system.name }}
            </h3>
            <p class="text-secondary-foreground">
                {{ system.experience }}
            </p>
        </div>
    </Card>
</template>

<script lang="ts" setup>
import { Card } from "~/components/ui/card";

defineProps<{
    system: {
        name: string;
        type: string;
        experience: string;
        image: string;
        padding: boolean;
    };
}>();
</script>