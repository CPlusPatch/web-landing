<template>
    <div class="flex items-center justify-center h-dvh w-full">
        <ClientOnly>
            <Widget class="!max-w-7xl" />
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import Widget from "~/components/cli/widget.client.vue";
</script>