<template>
    <section>
        <Container>
            <div
                class="h-48 md:h-72 flex items-center justify-center bg-dark-700 ring-1 ring-white/10 rounded-lg relative isolate overflow-hidden">
                <button v-if="!clicked" @click="clicked = true"
                    class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    Click to load surprise</button>
                <LazyPhysplay v-else />
            </div>
        </Container>
    </section>
</template>

<script lang="ts" setup>
import Container from "~/components/containers/big.vue";

const clicked = ref(false);
</script>