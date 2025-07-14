<template>
	<div
		ref="container"
		:class="[
			'bg-black/80 backdrop-blur-xl min-h-32 text-sm max-h-[70vh] w-screen max-w-full text-gray-100 whitespace-pre p-4 rounded-sm ring-2 ring-white/5 overflow-x-hidden overflow-y-auto [text-shadow:0_0_5px_#C8C8C8]',
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
import {
    Filesystem,
    Inode,
    InodeFlags,
    type InodeFunction,
    Shell,
} from "@cpluspatch/emulator";
import {
    cat,
    cd,
    echo,
    help,
    ls,
    neofetch,
    pwd,
    touch,
    which,
} from "@cpluspatch/emulator/commands";
import Uwuifier from "uwuifier";

const container = useTemplateRef<HTMLDivElement>("container");
const input = useTemplateRef<HTMLInputElement>("input");

onMounted(() => {
    useEventListener(input, "keypress", onInput, {
        passive: true,
    });
});

const makePrompt = (pwd: string[]) => {
    if (pwd.length === 2 && pwd[0] === "home" && pwd[1] === "jessew") {
        return "[jessew@website ~]$ ";
    }

    return `[jessew@website ${filesystem.formatPath(pwd)}]$ `;
};

const badapple: InodeFunction = async ({ shell }) => {
    shell.stdout("Loading frames...");

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
        shell.stdout(frame);

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
};

const filesystem = new Filesystem([
    new Inode(["usr", "bin", "ls"], ls, InodeFlags.Read | InodeFlags.Execute),
    new Inode(["usr", "bin", "cat"], cat, InodeFlags.Read | InodeFlags.Execute),
    new Inode(["usr", "bin", "cd"], cd, InodeFlags.Read | InodeFlags.Execute),
    new Inode(
        ["usr", "bin", "echo"],
        echo,
        InodeFlags.Read | InodeFlags.Execute,
    ),
    new Inode(["usr", "bin", "pwd"], pwd, InodeFlags.Read | InodeFlags.Execute),
    new Inode(
        ["usr", "bin", "touch"],
        touch,
        InodeFlags.Read | InodeFlags.Execute,
    ),
    new Inode(
        ["usr", "bin", "neofetch"],
        neofetch,
        InodeFlags.Read | InodeFlags.Execute,
    ),
    new Inode(
        ["usr", "bin", "fastfetch"],
        neofetch,
        InodeFlags.Read | InodeFlags.Execute,
    ),
    new Inode(
        ["usr", "bin", "help"],
        help,
        InodeFlags.Read | InodeFlags.Execute,
    ),
    new Inode(
        ["usr", "bin", "uwu"],
        ({ shell }) => {
            const uwuifier = new Uwuifier();
            applyFnToTextNodes((t) => uwuifier.uwuifySentence(t));
            shell.stdout("UwUified text");
        },
        InodeFlags.Read | InodeFlags.Execute,
    ),
    new Inode(
        ["usr", "bin", "clear"],
        () => {
            text.value = "";
        },
        InodeFlags.Read | InodeFlags.Execute,
    ),
    new Inode(
        ["usr", "bin", "which"],
        which,
        InodeFlags.Read | InodeFlags.Execute,
    ),
    new Inode(
        ["usr", "bin", "exit"],
        async () => {
            window.location.href = "https://google.com";
        },
        InodeFlags.Read | InodeFlags.Execute,
    ),
    new Inode(
        ["usr", "bin", "vivziepop"],
        ({ shell }) => {
            applyFnToTextNodes((t) => swearWordify(t));
            shell.stdout("Me if I was written by Vivziepop 🤯");
        },
        InodeFlags.Read | InodeFlags.Execute,
    ),
    new Inode(
        ["usr", "bin", "badapple"],
        badapple,
        InodeFlags.Read | InodeFlags.Execute,
    ),
    new Inode(
        ["home", "jessew", "hello.txt"],
        "Hey there! This is a file in your home directory.",
        InodeFlags.Read | InodeFlags.Write,
    ),
]);
const shell = new Shell(filesystem, ["home", "jessew"]);

const text = ref(makePrompt(shell.cwd));

const onStdout = (message: string) => {
    text.value += message;
};

onMounted(async () => {
    shell.output.on("stdout", onStdout);
    shell.output.on("stderr", onStdout);

    await executeCommand("fastfetch");
});

onUnmounted(() => {
    shell.output.off("stdout", onStdout);
    shell.output.off("stderr", onStdout);
});

const executeCommand = async (command: string, ...args: string[]) => {
    text.value += `${command} ${args.join(" ")}\n`;
    await shell.executeCommand(command, ...args);
    await nextTick();
    text.value += makePrompt(shell.cwd);
};

const onInput = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if ((e as KeyboardEvent).key === "Enter") {
        target.value = "";
        const command = value.trim().split(" ")[0];
        const args = value.trim().split(" ").slice(1);

        await executeCommand(command, ...args);

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
