<template>
    <div class="flex flex-col justify-end">
        <label :for="id" class="form-label">{{ label }}</label>
        <input :id="id" :type="type" class="form-input" v-bind="$attrs">
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    label: string;
    type?: string;
}>();

const id = computed(() => props.label.toLowerCase().replace(/\s+/g, "-"));
</script>