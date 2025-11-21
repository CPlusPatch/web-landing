<template>
    <div class="h-dvh w-dvw flex items-center justify-center">
        <div ref="gameContainer" class="h-[600px] w-[450px]" @click="addFruit"></div>
    </div>
</template>

<script lang="ts" setup>
import { Game, type PawnConfig } from "@cpluspatch/suika";
import pawnConfig from "@cpluspatch/suika/pawns.json";

const game = new Game(pawnConfig as PawnConfig[]);
const gameContainer = useTemplateRef("gameContainer");

const addFruit = async () => {
    const index = Math.floor(Math.random() * 3);
    await game.createPawn(pawnConfig[index] as PawnConfig, index);
};

onMounted(async () => {
    await nextTick();
    if (gameContainer.value) {
        await game.initialize(gameContainer.value);
        await game.start();
    }
});
</script>