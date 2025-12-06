<template>
    <div
        ref="dock"
        class="flex items-end gap-1 p-2 bg-[#2d2d2d]/80 border rounded-3xl backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
    >
        <div
            v-for="(app, index) in apps"
            :key="app.id"
            class="relative cursor-pointer origin-bottom hover:-translate-y-1 active:scale-95 active:-translate-y-1 duration-75"
            :title="app.name"
            :style="getIconStyle(index)"
            @click="emit('app-click', app.id)"
        >
            <img :src="app.icon" :alt="app.name" class="size-20 object-contain">
            <div
                v-if="app.open"
                class="absolute -bottom-[8%] left-1/2 transform -translate-x-1/2 size-1 bg-white/80 rounded-full shadow"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface DockApp {
    id: string;
    name: string;
    icon: string;
    open?: boolean;
}

interface Props {
    apps: DockApp[];
}

defineProps<Props>();

const emit = defineEmits<{
    "app-click": [appId: string];
}>();

const dockRef = useTemplateRef<HTMLDivElement>("dock");
const mouseX = ref<number | null>(null);

const MAX_SCALE = 1.1;
const EFFECT_RADIUS = 100;
const ICON_SIZE = 80;
const GAP_SIZE = 4;

const getScale = (index: number): number => {
    if (!mouseX.value) return 1;

    const iconCenter = index * (ICON_SIZE + GAP_SIZE) + ICON_SIZE / 2;
    const distance = Math.abs(mouseX.value - iconCenter);

    if (distance > EFFECT_RADIUS) return 1;

    const factor = 1 - distance / EFFECT_RADIUS;
    return 1 + factor * (MAX_SCALE - 1);
};

const getIconStyle = (index: number) => {
    const scale = getScale(index);
    const offset = (scale - 1) * 32; // Half icon size for bottom alignment

    return {
        transform: `scale(${scale}) translateY(-${offset}px)`,
        zIndex: Math.round(scale * 10),
    };
};

const handleMouseMove = (e: MouseEvent) => {
    if (dockRef.value) {
        const rect = dockRef.value.getBoundingClientRect();
        mouseX.value = e.clientX - rect.left;
    }
};

const handleMouseLeave = () => {
    mouseX.value = null;
};
</script>
