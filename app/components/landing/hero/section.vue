<script setup lang="ts">
import SquarePattern from "~/components/patterns/square-pattern.vue";
import { useJesse } from "~/composables/Jesse";
import HeroBackground from "./background.vue";
import HeroContent from "./content.vue";

const isJesse = useJesse();
</script>

<template>
    <section class="relative isolate pt-40 overflow-hidden">
        <SquarePattern/>
        <HeroBackground/>
        <HeroContent :is-jesse="isJesse"/>
    </section>
</template>
