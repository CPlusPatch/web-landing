<template>
    <div class="h-dvh w-dvw relative bg-cover bg-center bg-no-repeat" :style="{
        backgroundImage: wallpaper ? `url(${wallpaper.href})` : 'none',
    }">
        <WindowVue v-for="(win, index) in windows" :key="index" :window="win" @close="desktop.removeWindow(win)" />
    </div>
</template>

<script lang="ts" setup>
import { Desktop, Window, WindowDecorationFlags } from "@cpluspatch/desktop";
import { key } from "~/components/desktop/provider";
import WindowVue from "~/components/desktop/window.vue";

const desktop = new Desktop({
    wallpaper: new URL("https://wallpaperaccess.com/full/3312054.jpg"),
});
const windows = ref<Window[]>([]);
const wallpaper = ref<URL | null>(desktop.options.wallpaper);

const onWindowUpdate = (updatedWindows: Window[]) => {
    windows.value = updatedWindows;
};

desktop.emitter.on("window.update", onWindowUpdate);

onUnmounted(() => {
    desktop.emitter.off("window.update", onWindowUpdate);
});

desktop.addWindow(new Window());
provide(key, { desktop });
</script>
