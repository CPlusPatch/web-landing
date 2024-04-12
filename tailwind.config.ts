import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default (<Partial<Config>>{
    theme: {
        extend: {
            colors: {
                dark: {
                    50: "#4a4a4a",
                    100: "#3c3c3c",
                    200: "#323232",
                    300: "#2d2d2d",
                    400: "#222222",
                    500: "#1f1f1f",
                    600: "#1c1c1e",
                    700: "#1b1b1b",
                    800: "#181818",
                    900: "#0f0f0f",
                    950: "#080808",
                },
                gray: {
                    50: "#f7f7f8",
                    100: "#ececf1",
                    200: "#d9d9e3",
                    300: "#c5c5d2",
                    400: "#acacbe",
                    500: "#8e8ea0",
                    600: "#565869",
                    700: "#40414f",
                    800: "#343541",
                    900: "#202123",
                    950: "#050509",
                },
            },
        },
    },
    plugins: [forms, typography],
    content: [],
});
