<template>
    <section>
        <Container>
            <h2 class="sr-only">Surprise game</h2>
            <Card
                class="h-48 md:h-72 items-center justify-center outline-none!"
            >
                <Button
                    v-if="!clicked"
                    @click="clicked = true"
                    size="lg"
                    variant="outline"
                >
                    Click to load surprise
                </Button>
                <LazyPhysplay v-else/>
            </Card>
        </Container>
    </section>
</template>

<script lang="ts" setup>
import Container from "~/components/containers/big.vue";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

const clicked = ref(false);
</script>
