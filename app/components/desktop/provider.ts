import type { Desktop } from "@cpluspatch/desktop";
import type { Component } from "vue";
import Safari from "./apps/safari.vue";
import Terminal from "./apps/terminal.vue";

export const key = Symbol() as InjectionKey<{
    desktop: Desktop;
}>;

export const availableApps: Record<
    string,
    { name: string; icon: string; component: Component | null }
> = {
    finder: {
        name: "Finder",
        icon: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/9e80c50a5802d3b0a7ec66f3fe4ce348_low_res_Finder.png",
        component: null,
    },
    safari: {
        name: "Safari",
        icon: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/8204ffaf2c6f9f46a1a803a96c91e7d5_low_res_Safari.png",
        component: Safari,
    },
    kiesel: {
        name: "Kiesel",
        icon: "https://kiesel.dev/kiesel.svg",
        component: null,
    },
    terminal: {
        name: "Terminal",
        icon: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/88b357eeaad8b7d835e2232b4a9ed42c_low_res_Terminal__White_border_for_Dark_theme_.png",
        component: Terminal,
    },
};
