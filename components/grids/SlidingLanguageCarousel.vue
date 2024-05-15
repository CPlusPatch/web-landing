<script setup lang="ts">
const languages = [
    {
        name: "TypeScript",
        type: "Language",
        experience: "One year",
        image: "logos:typescript-icon",
        progress: 0.9,
        padding: false,
        id: "lGR1Y7t053rlfFSlqCQrQ",
    },
    {
        id: "oXSon6MptBgUDG0ztFwAk",
        name: "NixOS",
        type: "System",
        experience: "Recent",
        image: "devicon:nixos",
        padding: true,
    },
    {
        name: "Vue 3",
        type: "Framework",
        experience: "One year",
        image: "logos:vue",
        progress: 0.6,
        padding: true,
        id: "Ru-AmNtsycVzv4m2JEXLc",
    },
    {
        name: "JavaScript",
        type: "Language",
        experience: "Five years",
        image: "logos:javascript",
        progress: 1,
        padding: false,
        id: "Z7t8DsHrMiXGXI3L5SHN-",
    },
    {
        name: "React",
        type: "Framework",
        experience: "Two years",
        image: "logos:react",
        progress: 0.8,
        padding: 8,
        id: "GjD5s-ISGR9W6qv3jJoDL",
    },
    {
        name: "Next.js",
        type: "Framework",
        experience: "One year",
        image: "logos:nextjs",
        progress: 0.8,
        padding: 8,
        id: "PquyCVji0pGWteZCMEDRP",
    },
    {
        name: "CSS",
        type: "Language",
        experience: "Seven years",
        image: "logos:css-3",
        progress: 0.8,
        padding: true,
        id: "-F60ppRASu0xNjypH_h5B",
    },
    {
        name: "HTML",
        type: "Language",
        experience: "Seven years",
        image: "logos:html-5",
        progress: 1,
        padding: true,
        id: "hn7zNl1pA95jt7vFEMwMR",
    },
    {
        name: "Firebase",
        type: "Framework",
        experience: "One year",
        image: "logos:firebase",
        progress: 0.6,
        padding: 8,
        id: "IHxKRx8FYpGl6iZnsi94x",
    },
    {
        name: "Supabase",
        type: "Framework",
        experience: "One year",
        image: "logos:supabase-icon",
        progress: 0.6,
        padding: true,
        id: "U_toYRt_IlAw338bAK-yL",
    },
    {
        name: "Node.js",
        type: "Runtime",
        experience: "Three years",
        image: "logos:nodejs",
        progress: 0.8,
        padding: true,
        id: "FYEqXFt4EYMT924bKT85G",
    },
    {
        name: "Bun",
        type: "Runtime",
        experience: "One year",
        image: "logos:bun",
        progress: 0.6,
        padding: true,
        id: "f52vhBiXQ9zEUd-wijUqJ",
    },
    {
        name: "NPM",
        type: "Package Manager",
        experience: "Three years",
        image: "logos:npm-icon",
        progress: 1,
        id: "hDyUV0uzMqWJdveTlzOsR",
    },
    {
        name: "PNPM",
        type: "Package Manager",
        experience: "One year",
        image: "logos:pnpm",
        progress: 1,
        padding: 8,
        id: "5n7hN9r1u8rHqudWz7kTa",
    },
    {
        name: "Yarn",
        type: "Package Manager",
        experience: "One year",
        image: "logos:yarn",
        progress: 1,
        padding: 8,
        id: "AYaYTofDAYu6YWY2ChpNq",
    },
    {
        name: "TailwindCSS",
        type: "Framework",
        experience: "Two years",
        image: "logos:tailwindcss-icon",
        progress: 1,
        padding: 5,
        id: "jwtPGCxhZDrmZXntmQ5YK",
    },
    {
        name: "Unreal Engine",
        type: "Language",
        experience: "Five years",
        image: "logos:unrealengine-icon",
        progress: 0.2,
        padding: 8,
        id: "g2KiylUF3u_GMJSr0pN-8",
    },
    {
        name: "Github",
        type: "Repository",
        experience: "Four years",
        image: "logos:github-icon",
        progress: 0.9,
        padding: 8,
        id: "r-o4P7Xs4QQh8KOIkmAdA",
    },
    {
        name: "Discord.js",
        type: "Framework",
        experience: "One year",
        image: "logos:discord-icon",
        progress: 0.6,
        padding: 8,
        id: "4q5kjSWNy28fWmxMKcctv",
    },
    {
        name: "Python",
        type: "Language",
        experience: "Seven years",
        image: "logos:python",
        progress: 0.9,
        padding: 8,
        id: "0qoUgWV6ua8PsrY6gBHvX",
    },
    {
        name: "PHP",
        type: "Language",
        experience: "Four years",
        image: "logos:php-alt",
        progress: 0.5,
        padding: 8,
        id: "q1_E4tYL2vMD3buz3ukY8",
    },
    {
        name: "Laravel",
        type: "Framework",
        experience: "Two years",
        image: "logos:laravel",
        progress: 0.4,
        padding: 8,
        id: "JVjIAK9-MrBG2kGdlhtAe",
    },
    {
        name: "Vite",
        type: "Framework",
        experience: "One year",
        image: "logos:vitejs",
        progress: 0.5,
        padding: 8,
        id: "EKA38fN1AaKfX2cp8TYTS",
    },
    {
        name: "Git",
        type: "Tool",
        experience: "Four years",
        image: "logos:git-icon",
        progress: 0.8,
        padding: 8,
        id: "XQK50cDBVDJXZZEyK4KV-",
    },
    {
        name: "Docker",
        type: "Framework",
        experience: "Recent",
        image: "logos:docker-icon",
        progress: 0.3,
        padding: 8,
        id: "jRhAn1UyPpVC0L1bYjsge",
    },
    {
        name: "Preact",
        type: "Framework",
        experience: "Recent",
        image: "logos:preact",
        progress: 0.9,
        padding: 5,
        id: "AAKh5Y3WPrTgrC2MKwhnc",
    },
    {
        name: "Arduino",
        type: "Hardware",
        experience: "Seven years",
        image: "logos:arduino",
        progress: 0.4,
        padding: 8,
        id: "FDwbEXmnBY-bUWA8im6Gi",
    },
    {
        name: "Raspberry Pi",
        type: "Hardware",
        experience: "Seven years",
        image: "logos:raspberry-pi",
        progress: 1,
        padding: 8,
        id: "ihTizQz5mwMiFY-bggkTo",
    },
    {
        name: "JQuery",
        type: "Framework",
        experience: "Four years",
        image: "logos:jquery",
        progress: 0.5,
        padding: 8,
        id: "7DuePOkFm1KK6WTuoMD6N",
    },
    {
        name: "Rust",
        type: "Language",
        experience: "Recent",
        image: "logos:rust",
        progress: 0.2,
        padding: 8,
        id: "MIFQe905_Ib-8Vhzjxqof",
    },
    {
        name: "Ubuntu",
        type: "OS",
        experience: "Seven years",
        image: "logos:ubuntu",
        progress: 0.8,
        padding: 8,
        id: "ynPs4PpgS4-qzXpn-wrKK",
    },
    {
        name: "Arch Linux",
        type: "OS",
        experience: "Two years",
        image: "logos:archlinux",
        progress: 0.7,
        padding: 8,
        id: "LG8BQ3NYKO5mzn_8Ij3q2",
    },
    {
        name: "Nuxt 3",
        type: "",
        experience: "One year",
        image: "logos:nuxt-icon",
        padding: true,
        id: "0eV-I6JD8IhW-8JwmdgwX",
    },
    {
        name: "Godot",
        type: "Game Engine",
        experience: "Recent",
        image: "logos:godot-icon",
        padding: true,
        id: "HeV-I6JD8IhW-8JImdgwX",
    },
].toSorted((a, b) => a.name.localeCompare(b.name));

const { width } = useWindowSize();

const groupCount = computed(() => (width.value < 900 ? 5 : 3));

// Function to separate these languages into 3 equally sized groups, then return the nth group
const getGroup = (n: number) => {
    const groupSize = Math.ceil(languages.length / groupCount.value);
    const start = groupSize * n;
    const end = start + groupSize;
    return languages.slice(start, end);
};
</script>

<template>
    <div class="py-24 relative overflow-hidden flex flex-col gap-3">
        <div v-for="group of groupCount" :key="group" :class="[
            'flex top-0 flex-row gap-4 w-full shrink-0 min-w-full px-4 ',
            group % 2 === 1
                ? 'animate-[scrollLeft_40s_linear_infinite]'
                : 'animate-[scrollRight_40s_linear_infinite]',
        ]">
            <div v-for="system of getGroup(group - 1)" :key="system.id"
                class="flex w-72 bg-dark-200 shrink-0 col-span-1 divide-x divide-dark-300 ring-dark-300 rounded shadow ring-1 duration-200 hover:scale-[102%] no-bad-scale hover:shadow-2xl hover:ring-2 hover:ring-orange-500">
                <iconify-icon height="none" :icon="system.image" :class="[
            'icon object-contain rounded-sm duration-150 aspect-1 flex flex-shrink-0',
            system.padding ? 'm-2 sm:w-[calc(6rem-1rem)] h-[calc(5rem-1rem)] sm:h-[calc(6rem-1rem)] w-[calc(5rem-1rem)]' : 'sm:w-24 h-20 sm:h-24 w-20',
        ]" />
                <div class="flex relative flex-col h-full flex-1 justify-center items-start truncate bg-dark-400">
                    <div class="flex-1 px-4 py-2 text-sm truncate flex flex-col justify-center">
                        <h3 data-placeholder="Element name" class="text-lg font-bold text-gray-50">
                            {{ system.name }}
                        </h3>
                        <p data-placeholder="Element subtitle" class="text-gray-400">
                            {{ system.experience }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes scrollLeft {

    0%,
    100% {
        transform: translate3d(0, 0, 0);
    }

    50% {
        transform: translate3d(-50%, 0, 0);
    }
}

@keyframes scrollRight {

    0%,
    100% {
        transform: translate3d(-50%, 0, 0);
    }

    50% {
        transform: translate3d(0, 0, 0);
    }
}
</style>
