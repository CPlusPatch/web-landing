<template>
    <header class="grid grid-cols-[auto_1fr] gap-8">
        <div class="flex flex-col gap-3 min-w-36 items-center justify-center">
            <nuxt-img
                src="https://static.wikia.nocookie.net/helldivers_gamepedia/images/8/8d/Super_earth.png/revision/latest?cb=20180527113712"
                alt="Logo" class="size-36 shrink-0 invert -m-2" format="webp" />
            <strong class="my-0 text-center">{{ department }}</strong>
        </div>
        <div class="flex flex-col gap-3 justify-center">
            <h1 class="my-0">{{ title }}</h1>
            <h3 class="my-0">{{ subTitle }}</h3>
        </div>
    </header>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    department: string;
    subTitle: string;
}>();
</script>