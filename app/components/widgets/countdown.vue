<template>
    <div class="flex items-center justify-center w-full gap-6">
        <div class="flex flex-col items-center gap-1">
            <div
                class="font-mono md:text-4xl text-2xl text-primary-foreground *:rounded-sm flex flex-row gap-1 *:bg-accent *:px-2 *:pt-2 *:pb-1 *:leading-none"
            >
                <span> {{ Math.floor( hours / 10 ) }}</span>
                <span> {{ hours % 10 }}</span>
            </div>
            <p class="font-semibold text-secondary-foreground text-center">
                hours
            </p>
        </div>
        <div class="flex flex-col items-center gap-1">
            <div
                class="font-mono md:text-4xl text-2xl text-primary-foreground *:rounded-sm flex flex-row gap-1 *:bg-accent *:px-2 *:pt-2 *:pb-1 *:leading-none"
            >
                <span> {{ Math.floor( minutes / 10 ) }}</span>
                <span> {{ minutes % 10 }}</span>
            </div>
            <p class="font-semibold text-secondary-foreground text-center">
                minutes
            </p>
        </div>
        <div class="flex flex-col items-center gap-1">
            <div
                class="font-mono md:text-4xl text-2xl text-primary-foreground *:rounded-sm flex flex-row gap-1 *:bg-accent *:px-2 *:pt-2 *:pb-1 *:leading-none"
            >
                <span> {{ Math.floor( seconds / 10 ) }}</span>
                <span> {{ seconds % 10 }}</span>
            </div>
            <p class="font-semibold text-secondary-foreground text-center">
                seconds
            </p>
        </div>
        <div class="flex flex-col items-center gap-1">
            <div
                class="font-mono md:text-4xl text-2xl text-primary-foreground *:rounded-sm flex flex-row gap-1 *:bg-accent *:px-2 *:pt-2 *:pb-1 *:leading-none"
            >
                <span> {{ Math.floor( milliseconds / 100 ) }}</span>
                <span> {{ Math.floor( ( milliseconds % 100 ) / 10 ) }}</span>
                <span> {{ milliseconds % 10 }}</span>
            </div>
            <p class="font-semibold text-secondary-foreground text-center">
                ms
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { hours, minutes, seconds, milliseconds } = defineProps<{
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}>();
</script>
