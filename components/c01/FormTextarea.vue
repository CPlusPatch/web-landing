<template>
    <div>
        <label :for="id" class="form-label">{{ label }}</label>
        <textarea :id="id" class="form-input" v-bind="$attrs"></textarea>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    label: string;
}>();

const id = computed(() => props.label.toLowerCase().replace(/\s+/g, "-"));
</script>