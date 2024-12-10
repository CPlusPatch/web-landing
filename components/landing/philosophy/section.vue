<script setup lang="ts">
import Container from "~/components/containers/big.vue";
import PhilosophyImage from "./image.vue";
import PhilosophyPrinciples from "./principles.vue";
</script>

<template>
    <section id="philosophy" class="relative">
        <Container class="lg:flex lg:justify-between xl:justify-end">
            <PhilosophyImage />
            <div class="px-6 lg:contents">
                <div
                    class="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
                    <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
                        My philosophy
                    </h1>
                    <p class="mt-6 text-xl leading-8 text-gray-200">
                        I believe in the power of open source and open standards. Nearly all of my work is licensed
                        under a free license such as the GPLv3, which allows me to work with secure, extensible and
                        reliable software.
                    </p>
                    <PhilosophyPrinciples />
                </div>
            </div>
        </Container>
    </section>
</template>