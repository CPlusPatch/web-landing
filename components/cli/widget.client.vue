<template>
	<div
		ref="container"
		:class="[
			'bg-black/80 backdrop-blur-xl min-h-32 max-h-200 w-screen max-w-full text-gray-100 whitespace-pre p-4 rounded-sm ring-2 ring-white/5 overflow-x-hidden overflow-y-auto [text-shadow:0_0_5px_#C8C8C8]',
			$style.container,
		]">
		{{ text }}
		<input
			type="text"
			ref="input"
			class="w-full bg-transparent border-none outline-hidden ring-0! p-0 -ml-[1ch]"
			placeholder="Type here..." />
	</div>
</template>

<style module>
.container {
	font-family: "Inconsolata", monospace;
	font-display: swap;
}

.container::after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: repeating-linear-gradient(
		rgba(0, 0, 0, 0.15),
		rgba(0, 0, 0, 0.15) 1px,
		transparent 1px,
		transparent 2px
	);
	pointer-events: none;
}
</style>

<script lang="ts" setup>
import { BrowserDetector } from "browser-dtector";
import Uwuifier from "uwuifier";
import { demoFilesystemDirectory, FileSystemEmulator } from "./emulator";

const container = useTemplateRef<HTMLDivElement>("container");
const input = useTemplateRef<HTMLInputElement>("input");
const prompt = "[jessew@hacktop ~]$ ";
const detector = new BrowserDetector(
    window.navigator.userAgent,
).parseUserAgent();
const timeAtLoad = new Date();

const fastfetchText = `                                                  jessew@hacktop
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

const filesystem = new FileSystemEmulator(demoFilesystemDirectory, [
    "home",
    "jessew",
]);

type MaybePromise<T> = T | Promise<T>;
const commandActions: Record<string, (args: string[]) => MaybePromise<void>> = {
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
    exit: () => {
        window.location.href = "https://google.com";
    },
    vivziepop: () => {
        applyFnToTextNodes((t) => swearWordify(t));
        text.value += "Me if I was written by Vivziepop 🤯\n";
    },
    fastfetch: () => {
        text.value += `${fastfetchText}\n`;
    },
    pwd: () => {
        text.value += `${filesystem.pwd()}\n`;
    },
    ls: (args) => {
        const path = args[0] || ".";

        const files = filesystem.ls(path);
        text.value += `${files.map((f) => f.name).join("   ")}\n`;
    },
    cat: (args) => {
        const path = args[0];
        const content = filesystem.cat(path);
        if (content === null) {
            text.value += `cat: ${path}: No such file or directory\n`;
        } else {
            text.value += `${content}\n`;
        }
    },
    cd: (args) => {
        const path = args[0];

        if (!filesystem.cd(path)) {
            text.value += `cd: ${path}: No such file or directory\n`;
        }
    },
    touch: (args) => {
        const name = args[0];
        const content = args[1];
        filesystem.touch(name, content);
    },
    mkdir: (args) => {
        const path = args[0];
        filesystem.mkdir(path);
    },
    badapple: async () => {
        text.value += "Loading frames...\n";

        const VERTICAL_RES = 26;
        const FPS = 1;

        // Load assets
        const frameText = await fetch("/ascii/badapple.txt").then((res) =>
            res.text(),
        );
        const audio = new Audio("/audio/bad-apple.mp3");
        await new Promise((resolve) => {
            audio.addEventListener("canplaythrough", resolve);
        });
        audio.play();

        const chunkEveryNewlines = (text: string, height: number): string[] => {
            const chunks = [];
            const split = text.split("\n");

            for (let i = 0; i < split.length; i += height) {
                chunks.push(split.slice(i, i + height).join("\n"));
            }

            return chunks;
        };

        // Split every VERTICAL_RES lines into a frame
        const frames = chunkEveryNewlines(frameText, VERTICAL_RES);

        for (const frame of frames) {
            text.value += `${frame}\n`;

            await nextTick();

            // Scroll to the bottom
            if (container.value) {
                container.value.scrollTop = container.value.scrollHeight;
            }

            await new Promise((resolve) => setTimeout(resolve, 1000 / FPS));

            // Remove the last frame
            text.value = text.value.slice(0, -frame.length - 1);
            await nextTick();
        }
    },
};

const onInput = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if ((e as KeyboardEvent).key === "Enter") {
        target.value = "";
        const command = value.trim().split(" ")[0];
        const args = value.trim().split(" ").slice(1);

        text.value += `${value.trim()}\n`;

        if (commandActions[command]) {
            await commandActions[command](args);
        } else {
            text.value += `Command not found: ${command}\n`;
        }

        text.value += `${prompt.replace(
            "~",
            filesystem.pwd() === "/home/jessew" ? "~" : filesystem.pwd(),
        )}`;

        await nextTick();

        if (container.value) {
            container.value.scrollTop = container.value.scrollHeight;
        }
        target.focus();
    }
};

defineExpose({
    clear: () => {
        text.value = "";
    },
    focus: () => {
        if (input.value) {
            input.value.focus();
        }
    },
});
</script>
