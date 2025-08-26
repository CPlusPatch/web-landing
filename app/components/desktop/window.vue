<template>
    <div ref="element" class="text-card-foreground bg-card/95 grid grid-rows-[auto_1fr] backdrop-blur-xl rounded-md border shadow-sm absolute" :style="{
        width: `${width}px`,
        height: `${height}px`,
        left: `${x}px`,
        top: `${y}px`
    }">
        <WindowResizeHandles @resize="onResize" />
        <Titlebar :window="window" />
        <div class="overflow-scroll">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Window } from "@cpluspatch/desktop";
import Titlebar from "./titlebar.vue";
import WindowResizeHandles from "./window-resize-handles.vue";

const { window } = defineProps<{
    window: Window;
}>();

const element = useTemplateRef<HTMLElement>("element");

const width = ref<number>(window.geometry.width);
const height = ref<number>(window.geometry.height);
const x = ref<number>(window.geometry.x);
const y = ref<number>(window.geometry.y);

const onGeometryUpdate = (window: Window) => {
    width.value = window.geometry.width;
    height.value = window.geometry.height;
    x.value = window.geometry.x;
    y.value = window.geometry.y;
};

type Side =
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";

const onResize = (side: Side, deltaX: number, deltaY: number) => {
    let width = 0;
    let height = 0;
    let x = 0;
    let y = 0;

    switch (side) {
        case "top":
            height -= deltaY;
            y += deltaY;
            break;
        case "right":
            width += deltaX;
            break;
        case "bottom":
            height += deltaY;
            break;
        case "left":
            width -= deltaX;
            x += deltaX;
            break;
        case "top-right":
            height -= deltaY;
            y += deltaY;
            width += deltaX;
            break;
        case "top-left":
            height -= deltaY;
            y += deltaY;
            width -= deltaX;
            x += deltaX;
            break;
        case "bottom-right":
            height += deltaY;
            width += deltaX;
            break;
        case "bottom-left":
            height += deltaY;
            width -= deltaX;
            x += deltaX;
            break;
    }

    const rect = new DOMRect(
        window.geometry.x + x,
        window.geometry.y + y,
        window.geometry.width + width,
        window.geometry.height + height,
    );
    window.updateGeometry(rect);
};

window.emitter.on("geometry.update", onGeometryUpdate);

onUnmounted(() => {
    window.emitter.off("geometry.update", onGeometryUpdate);
});
</script>
