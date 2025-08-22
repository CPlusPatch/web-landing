<template>
    <div :class="['w-full h-full absolute pointer-events-none *:pointer-events-auto', !showResizeHandles && '*:opacity-0']">
        <div class="absolute h-full inset-y-0 bg-purple-600 hover:cursor-e-resize" :style="{
            width: `${handleWidth}px`,
            right: `-${handleWidth / 2}px`
        }" ref="rightHandle" />
        <div class="absolute w-full inset-x-0 bg-purple-600 hover:cursor-s-resize" :style="{
            height: `${handleWidth}px`,
            bottom: `-${handleWidth / 2}px`
        }" ref="bottomHandle" />
        <div class="absolute h-full inset-y-0 bg-purple-600 hover:cursor-w-resize" :style="{
            width: `${handleWidth}px`,
            left: `-${handleWidth / 2}px`
        }" ref="leftHandle" />
        <div class="absolute w-full inset-x-0 bg-purple-600 hover:cursor-n-resize" :style="{
            height: `${handleWidth}px`,
            top: `-${handleWidth / 2}px`
        }" ref="topHandle" />
        <div class="absolute bg-red-600 hover:cursor-ne-resize" :style="{
            width: `${handleWidth}px`,
            height: `${handleWidth}px`,
            right: `-${handleWidth / 2}px`,
            top: `-${handleWidth / 2}px`
        }" ref="topRightHandle" />
        <div class="absolute bg-red-600 hover:cursor-nw-resize" :style="{
            width: `${handleWidth}px`,
            height: `${handleWidth}px`,
            left: `-${handleWidth / 2}px`,
            top: `-${handleWidth / 2}px`
        }" ref="topLeftHandle" />
        <div class="absolute bg-red-600 hover:cursor-se-resize" :style="{
            width: `${handleWidth}px`,
            height: `${handleWidth}px`,
            right: `-${handleWidth / 2}px`,
            bottom: `-${handleWidth / 2}px`
        }" ref="bottomRightHandle" />
        <div class="absolute bg-red-600 hover:cursor-sw-resize" :style="{
            width: `${handleWidth}px`,
            height: `${handleWidth}px`,
            left: `-${handleWidth / 2}px`,
            bottom: `-${handleWidth / 2}px`
        }" ref="bottomLeftHandle" />
    </div>
</template>

<script lang="ts" setup>
import type { Position } from "@vueuse/core";

const showResizeHandles = ref(false);
const handleWidth = ref(10);

type Side =
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
const emit = defineEmits<{
    resize: [Side, number, number];
}>();

const rightElement = useTemplateRef<HTMLElement>("rightHandle");
const leftElement = useTemplateRef<HTMLElement>("leftHandle");
const topElement = useTemplateRef<HTMLElement>("topHandle");
const bottomElement = useTemplateRef<HTMLElement>("bottomHandle");
const topRightElement = useTemplateRef<HTMLElement>("topRightHandle");
const topLeftElement = useTemplateRef<HTMLElement>("topLeftHandle");
const bottomLeftElement = useTemplateRef<HTMLElement>("bottomLeftHandle");
const bottomRightElement = useTemplateRef<HTMLElement>("bottomRightHandle");

const onMove = (
    position: Position,
    side: Side,
    element: Ref<HTMLElement | null>,
) => {
    if (!element.value) {
        throw new Error(`${side} handle element not found`);
    }

    // Calculate position delta
    const rect = element.value.getBoundingClientRect();
    let deltaX = 0;
    let deltaY = 0;

    switch (side) {
        case "top":
            deltaX = 0;
            deltaY = position.y - rect.top;
            break;
        case "right":
            deltaX = position.x - rect.right;
            deltaY = 0;
            break;
        case "bottom":
            deltaX = 0;
            deltaY = position.y - rect.bottom;
            break;
        case "left":
            deltaX = position.x - rect.left;
            deltaY = 0;
            break;
        case "top-right":
            deltaX = position.x - rect.right;
            deltaY = position.y - rect.top;
            break;
        case "top-left":
            deltaX = position.x - rect.left;
            deltaY = position.y - rect.top;
            break;
        case "bottom-right":
            deltaX = position.x - rect.right;
            deltaY = position.y - rect.bottom;
            break;
        case "bottom-left":
            deltaX = position.x - rect.left;
            deltaY = position.y - rect.bottom;
            break;
    }

    emit("resize", side, deltaX, deltaY);
};

useDraggable(rightElement, {
    onMove: (position) => onMove(position, "right", rightElement),
    preventDefault: true,
});
useDraggable(leftElement, {
    onMove: (position) => onMove(position, "left", leftElement),
    preventDefault: true,
});
useDraggable(topElement, {
    onMove: (position) => onMove(position, "top", topElement),
    preventDefault: true,
});
useDraggable(bottomElement, {
    onMove: (position) => onMove(position, "bottom", bottomElement),
    preventDefault: true,
});
useDraggable(bottomRightElement, {
    onMove: (position) => onMove(position, "bottom-right", bottomRightElement),
    preventDefault: true,
});
useDraggable(bottomLeftElement, {
    onMove: (position) => onMove(position, "bottom-left", bottomLeftElement),
    preventDefault: true,
});
useDraggable(topRightElement, {
    onMove: (position) => onMove(position, "top-right", topRightElement),
    preventDefault: true,
});
useDraggable(topLeftElement, {
    onMove: (position) => onMove(position, "top-left", topLeftElement),
    preventDefault: true,
});
</script>