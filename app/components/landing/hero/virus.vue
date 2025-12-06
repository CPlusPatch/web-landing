<template>
    <Button @click="memz.all()">
        <Worm/>I want a virus!
    </Button>
</template>

<script lang="ts" setup>
import Memz from "@skwalexe/memz";
import { Worm } from "lucide-vue-next";
import { Button } from "~/components/ui/button";

const memz = new Memz(
    "https://cdn.jsdelivr.net/gh/SkwalExe/Memz.js@0.1.0/src/assets/",
);
</script>
