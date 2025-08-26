<template>
    <div class="h-dvh w-dvw relative bg-cover bg-center bg-no-repeat overflow-hidden" :style="{
        backgroundImage: wallpaper ? `url(${wallpaper.href})` : 'none',
    }">
        <component v-for="win in windows" :key="win.id" :is="availableApps[win.appId]?.component" :window="win" @close="desktop.removeWindow(win)" />

        <div class="absolute bottom-4 flex justify-center w-full">
            <Dock :apps="dockApps" @app-click="openApp" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Desktop, Window } from "@cpluspatch/desktop";
import Dock from "~/components/desktop/dock.vue";
import { availableApps, key } from "~/components/desktop/provider";

const desktop = new Desktop({
    wallpaper: new URL("https://wallpaperaccess.com/full/3312054.jpg"),
});
const windows = ref<Window[]>([]);
const wallpaper = ref<URL | null>(desktop.options.wallpaper);

const openApps = ref<string[]>([]);

const openApp = (appId: string) => {
    const appData = availableApps[appId];
    if (!appData) {
        return;
    }

    if (!openApps.value.includes(appId)) {
        openApps.value.push(appId);
    }
    const window = new Window(appId, { title: appData.name });
    desktop.addWindow(window);
};

const dockApps = computed(() =>
    Object.entries(availableApps).map(([id, app]) => ({
        id,
        name: app.name,
        icon: app.icon,
        open: openApps.value.includes(id),
    })),
);

const onWindowUpdate = (updatedWindows: Window[]) => {
    windows.value = updatedWindows;

    // Remove closed windows from openApps
    const openWindowIds = new Set(updatedWindows.map((win) => win.appId));
    openApps.value = openApps.value.filter((appId) => openWindowIds.has(appId));
};

desktop.emitter.on("window.update", onWindowUpdate);

onUnmounted(() => {
    desktop.emitter.off("window.update", onWindowUpdate);
});

provide(key, { desktop });
</script>
