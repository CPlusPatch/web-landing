<template>
    <div class="grid grid-cols-[auto_1fr] items-center gap-2 text-sm">
        <input type="checkbox" class="rounded-sm" />
        <label class="col-start-2">{{ label }}</label>
        <span class="col-start-2 font-semibold">{{ fee }} per copy</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label: string;
    fee: string;
}>();
</script>