<template>
    <div ref="titleBar"
        class="p-2 text-center bg-card relative rounded-t-md flex items-center justify-center w-full z-2 border-b font-semibold text-sm">
        <div></div>
        <h1 class="truncate">{{ window.title || "Untitled Window" }}</h1>
        <div class="flex items-center gap-1 *:size-6 *:cursor-pointer absolute right-0 pr-2 bg-card">
            <Button v-if="window.decorationFlags & WindowDecorationFlags.Minimize" variant="ghost" size="icon">
                <Minus />
            </Button>
            <Button v-if="window.decorationFlags & WindowDecorationFlags.Maximize" variant="ghost" size="icon">
                <Maximize2 />
            </Button>
            <Button v-if="window.decorationFlags & WindowDecorationFlags.Close" variant="ghost" size="icon" @click="data?.desktop.removeWindow(window)">
                <X />
            </Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Window, WindowDecorationFlags } from "@cpluspatch/desktop";
import { Maximize2, Minus, X } from "lucide-vue-next";
import { Button } from "../ui/button";
import { key } from "./provider";

const { window } = defineProps<{
    window: Window;
}>();

const titlebar = useTemplateRef<HTMLElement>("titleBar");
const data = inject(key);

useDraggable(titlebar, {
    onMove: (position) => {
        window.updateGeometry(
            new DOMRect(
                position.x,
                position.y,
                window.geometry.width,
                window.geometry.height,
            ),
        );
    },
});
</script>