<template>
    <section>
        <Container class="!px-0">
            <div
                class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Work with me today.
                </h2>
                <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                    Need more information? Want to have a chat? I'll even mail you a
                    new pair of pants if you need one.
                </p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                    <NuxtLink href="/contact"
                        class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                        Send me a message</NuxtLink>
                </div>
                <Halo />
            </div>
        </Container>
    </section>
</template>

<script lang="ts" setup>
import Container from "~/components/containers/big.vue";
import Halo from "./halo.vue";
</script>