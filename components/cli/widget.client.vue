<template>
  <div ref="container" class="bg-black min-h-32 max-h-[50rem] w-screen max-w-full text-gray-100 whitespace-pre p-4 rounded ring-2 ring-white/5 font-mono overflow-x-hidden overflow-y-auto">
    {{ text }}
    <input 
      type="text"
      ref="input"
      class="w-full bg-transparent border-none outline-none !ring-0 p-0 -ml-[1ch]"
      placeholder="Type here..." />
  </div>
</template>

<script lang="ts" setup>
import { BrowserDetector } from "browser-dtector";
import Uwuifier from "uwuifier";

const container = useTemplateRef<HTMLDivElement>("container");
const input = useTemplateRef<HTMLInputElement>("input");
const prompt = "[jessew@hacktop ~]$ ";
const detector = new BrowserDetector(
    window.navigator.userAgent,
).parseUserAgent();
const timeAtLoad = new Date();

const fastfetchText = `                                          jessew@hacktop
  ⠀⠀⠀⠀⠀⢀⣤⠖⠒⠒⠒⢒⡒⠒⠒⠒⠒⠒⠲⠦⠤⢤⣤⣄⣀⠀⠀⠀⠀⠀    --------------
  ⠀⠀⠀⠀⣠⠟⠀⢀⠠⣐⢭⡐⠂⠬⠭⡁⠐⠒⠀⠀⣀⣒⣒⠐⠈⠙⢦⠀⠀⠀    OS: ${detector.name} ${detector.version}
  ⠀⠀⠀⣰⠏⠀⠐⠡⠪⠂⣁⣀⣀⣀⡀⠰⠀⠀⠀⢨⠂⠀⠀⠈⢢⠀⠀⢹⠀⠀    Host: JesseOS (1.2.4)
  ⠀⣠⣾⠿⠤⣤⡀⠤⡢⡾⠿⠿⠿⣬⣉⣷⠀⠀⢀⣨⣶⣾⡿⠿⠆⠤⠤⠌⡳⣄    Kernel: ${detector.platform}
  ⣰⢫⢁⡾⠋⢹⡙⠓⠦⠤⠴⠛⠀⠀⠈⠁⠀⠀⠀⢹⡀⠀⢠⣄⣤⢶⠲⠍⡎⣾    Uptime: 0s
  ⢿⠸⠸⡇⠶⢿⡙⠳⢦⣄⣀⠐⠒⠚⣞⢛⣀⡀⠀⠀⢹⣶⢄⡀⠀⣸⡄⠠⣃⣿    Packages: 2067 (jacman), 90 (jatpak)
  ⠈⢷⣕⠋⠀⠘⢿⡶⣤⣧⡉⠙⠓⣶⠿⣬⣀⣀⣐⡶⠋⣀⣀⣬⢾⢻⣿⠀⣼⠃    Shell: jash 0.22.1
  ⠀⠀⠙⣦⠀⠀⠈⠳⣄⡟⠛⠿⣶⣯⣤⣀⣀⣏⣉⣙⣏⣉⣸⣧⣼⣾⣿⠀⡇⠀    Display (${detector.name.toUpperCase()}): 1920x1080 @ 165 Hz in 16" [Built-in]
  ⠀⠀⠀⠘⢧⡀⠀⠀⠈⠳⣄⡀⣸⠃⠉⠙⢻⠻⠿⢿⡿⢿⡿⢿⢿⣿⡟⠀⣧⠀    DE: JNOME 48.0
  ⠀⠀⠀⠀⠀⠙⢦⣐⠤⣒⠄⣉⠓⠶⠤⣤⣼⣀⣀⣼⣀⣼⣥⠿⠾⠛⠁⠀⢿⠀    WM: Jutter (Wayland)
  ⠀⠀⠀⠀⠀⠀⠀⠈⠙⠦⣭⣐⠉⠴⢂⡤⠀⠐⠀⠒⠒⢀⡀⠀⠄⠁⡠⠀⢸⠀    WM Theme: jessew-dark
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠲⢤⣀⣀⠉⠁⠀⠀⠀⠒⠒⠒⠉⠀⢀⡾⠀    Theme: Breeze [Qt], adw-gtk3-dark [GTK2/3/4]
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠲⠦⠤⠤⠤⠤⠴⠞⠋⠀⠀    Icons: breeze-dark [Qt], Adwaita [GTK2/3/4]
                                           Font: JetBrains Mono (10pt) [Qt], Adwaita Sans (10pt) [GTK2/3/4]
                                           Cursor: Adwaita (24px)
                                           Terminal: jtty 1.4.0
                                           Terminal Font: JetBrainsMono Nerd Font (11pt)
                                           CPU: JessePU (16) @ 4.50 GHz
                                           GPU 2: Nvidia RTX 4090D [Integrated]
                                           Memory: 9.50 GiB / 63.43 GiB (64%)
                                           Disk (/): 203.76 GiB / 223.54 GiB (91%) - btrfs
                                           Local IP (wlan0): 192.168.2.154/24
                                           Locale: en_GB.UTF-8`;

const initialText = `${prompt}fastfetch\n${fastfetchText}\n`;

const text = ref(initialText + prompt);

onMounted(() => {
    useEventListener(input, "keypress", onInput, {
        passive: true,
    });
});

useIntervalFn(() => {
    const now = new Date();
    const uptime = Math.floor((now.getTime() - timeAtLoad.getTime()) / 1000);
    const uptimeString = `${Math.floor(uptime)}s`;
    text.value = text.value.replace(/Uptime: \d+s/, `Uptime: ${uptimeString}`);
}, 1000);

const commandActions: Record<string, () => void> = {
    clear: () => {
        text.value = "";
    },
    help: () => {
        const commands = Object.keys(commandActions);
        text.value += `Available commands: ${commands.join(", ")}\n`;
    },
    uwu: () => {
        const uwuifier = new Uwuifier();
        applyFnToTextNodes((t) => uwuifier.uwuifySentence(t));
        text.value += "UwUified text\n";
    },
    vivziepop: () => {
        applyFnToTextNodes((t) => swearWordify(t));
        text.value += "BITCH\n";
    },
    fastfetch: () => {
        text.value += `${fastfetchText}\n`;
    },
};

const onInput = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if ((e as KeyboardEvent).key === "Enter") {
        target.value = "";
        const command = value.trim();

        text.value += `${command}\n`;

        if (commandActions[command]) {
            commandActions[command]();
        } else {
            text.value += `Command not found: ${command}\n`;
        }

        text.value += `${prompt}`;

        await nextTick();

        if (container.value) {
            container.value.scrollTop = container.value.scrollHeight;
        }
        target.focus();
    }
};
</script>