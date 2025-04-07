import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default (<Partial<Config>>{
    darkMode: ["class"],
    theme: {
        extend: {
            colors: {
                dark: {
                    "50": "#4a4a4a",
                    "100": "#3c3c3c",
                    "200": "#323232",
                    "300": "#2d2d2d",
                    "400": "#222222",
                    "500": "#1f1f1f",
                    "600": "#1c1c1e",
                    "700": "#1b1b1b",
                    "800": "#181818",
                    "900": "#0f0f0f",
                    "950": "#080808",
                },
                gray: {
                    "50": "#f7f7f8",
                    "100": "#ececf1",
                    "200": "#d9d9e3",
                    "300": "#c5c5d2",
                    "400": "#acacbe",
                    "500": "#8e8ea0",
                    "600": "#565869",
                    "700": "#40414f",
                    "800": "#343541",
                    "900": "#202123",
                    "950": "#050509",
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
            },
            keyframes: {
                wiggle: {
                    "0%, 100%": {
                        transform: "rotate(0deg)",
                    },
                    "25%": {
                        transform: "rotate(3deg)",
                    },
                    "50%": {
                        transform: "rotate(-3deg)",
                    },
                    "75%": {
                        transform: "rotate(2deg)",
                    },
                },
            },
            animation: {
                wiggle: "wiggle 0.5s ease-in-out",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [forms, typography, animate],
    content: [],
});
