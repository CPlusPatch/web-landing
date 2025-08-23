<template>
    <div class="h-dvh w-dvw relative bg-cover bg-center bg-no-repeat" :style="{
        backgroundImage: wallpaper ? `url(${wallpaper.href})` : 'none',
    }">
        <component v-for="(win, index) in windows" :key="index" :is="apps.find(app => app.id === win.appId)?.component" :window="win" @close="desktop.removeWindow(win)" />

        <div class="absolute bottom-4 flex justify-center w-full">
            <Dock :apps="apps" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Desktop, Window } from "@cpluspatch/desktop";
import Safari from "~/components/desktop/apps/safari.vue";
import Terminal from "~/components/desktop/apps/terminal.vue";
import Dock from "~/components/desktop/dock.vue";
import { key } from "~/components/desktop/provider";

const desktop = new Desktop({
    wallpaper: new URL("https://wallpaperaccess.com/full/3312054.jpg"),
});
const windows = ref<Window[]>([]);
const wallpaper = ref<URL | null>(desktop.options.wallpaper);

const apps = [
    {
        id: "finder",
        name: "Finder",
        icon: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/9e80c50a5802d3b0a7ec66f3fe4ce348_low_res_Finder.png",
    },
    {
        id: "safari",
        component: Safari,
        name: "Safari",
        icon: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/8204ffaf2c6f9f46a1a803a96c91e7d5_low_res_Safari.png",
    },
    {
        id: "kiesel",
        name: "Kiesel",
        icon: "https://kiesel.dev/kiesel.svg",
    },
    {
        id: "terminal",
        component: Terminal,
        name: "Terminal",
        icon: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/88b357eeaad8b7d835e2232b4a9ed42c_low_res_Terminal__White_border_for_Dark_theme_.png",
    },
];

const onWindowUpdate = (updatedWindows: Window[]) => {
    windows.value = updatedWindows;
};

desktop.emitter.on("window.update", onWindowUpdate);

onUnmounted(() => {
    desktop.emitter.off("window.update", onWindowUpdate);
});

const terminalWindow = new Window("terminal", { title: "Terminal" });
const safariWindow = new Window("safari", { title: "Safari" });
desktop.addWindow(terminalWindow);
desktop.addWindow(safariWindow);
terminalWindow.updateGeometry(new DOMRect(100, 100, 800, 600));
safariWindow.updateGeometry(new DOMRect(200, 200, 800, 600));

provide(key, { desktop });
</script>
