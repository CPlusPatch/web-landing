<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

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
