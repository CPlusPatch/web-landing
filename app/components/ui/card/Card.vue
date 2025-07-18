<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface Props extends PrimitiveProps {
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    as: "div",
});
</script>

<template>
  <Primitive
    data-slot="card"
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-lg border p-6 shadow-sm hover:outline-2 outline-primary/80 duration-100 ease-in-out hover:shadow-xl',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
