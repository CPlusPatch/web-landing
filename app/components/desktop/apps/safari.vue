<template>
    <WindowVue :window="window">
        <form class="p-1 grid grid-cols-[auto_auto_auto_1fr_auto]" @submit.prevent="onSubmit">
            <Button variant="ghost" size="icon">
                <ArrowLeft />
            </Button>
            <Button variant="ghost" size="icon">
                <ArrowRight />
            </Button>
            <Button variant="ghost" size="icon">
                <RotateCw />
            </Button>
            <Input class="ring-0!" name="url" :default-value="currentUrl" />
            <Button variant="ghost" size="icon" type="submit">
                <Send />
            </Button>
        </form>
        <Iframe :url="currentUrl" />
    </WindowVue>
</template>

<script lang="ts" setup>
import type { Window } from "@cpluspatch/desktop";
import { ArrowLeft, ArrowRight, RotateCw, Send } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Iframe from "../iframe/iframe.vue";
import WindowVue from "../window.vue";

const { window } = defineProps<{
    window: Window;
}>();

const onSubmit = (e: Event) => {
    const formData = new FormData(e.target as HTMLFormElement);
    currentUrl.value = formData.get("url") as string;
};

const currentUrl = ref<string>("https://linus.dev");
</script>