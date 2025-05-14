<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <p
    data-slot="card-description"
    :class="cn('text-secondary-foreground text-sm leading-6', props.class)"
  >
    <slot />
  </p>
</template>
