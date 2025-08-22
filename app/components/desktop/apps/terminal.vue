<template>
    <WindowVue :window="window">
        <Widget class="!rounded-none !border-none !h-full !max-h-full" />
    </WindowVue>
</template>

<script lang="ts" setup>
import type { Window } from "@cpluspatch/desktop";
import Widget from "~/components/cli/widget.client.vue";
import WindowVue from "../window.vue";

const { window } = defineProps<{
    window: Window;
}>();
</script>