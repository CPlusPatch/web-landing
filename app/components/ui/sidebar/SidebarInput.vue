<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Input as UiInput } from "~/components/ui/input";
import { cn } from "~/lib/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <UiInput
        data-slot="sidebar-input"
        data-sidebar="input"
        :class="cn(
      'bg-background h-8 w-full shadow-none',
      props.class,
    )"
    >
        <slot/>
    </UiInput>
</template>
