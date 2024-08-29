import { cn } from "@/lib/utils";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import type React from "react";
import { BackgroundGradient } from "./background-gradient";

export function FeaturesGrid() {
    const features = [
        {
            title: "Security first",
            description:
                "It is all too often that application security is an afterthought. Not with with me.",
            icon: <Icon icon="tabler:shield" />,
        },
        {
            title: "Proficiency in all OSes",
            description:
                "Whether it's Windows, macOS, Linux, iOS, Android, or the Web, I've got experience there.",
            icon: <Icon icon="tabler:brand-finder" />,
        },
        {
            title: "Boldness like no other",
            description:
                "I'm always ready to take on new challenges and learn new things.",
            icon: <Icon icon="tabler:test-pipe" />,
        },
        {
            title: "Made to scale",
            description: "Proficiency in large-scale containerized deployments",
            icon: <Icon icon="tabler:cloud" />,
        },
        {
            title: "You name it, I've used it",
            description:
                "I have experience with a very wide range of programming languages and frameworks.",
            icon: <Icon icon="tabler:brand-typescript" />,
        },
        {
            title: "Engineering excellence",
            description:
                "I strive to write clean, maintainable, and efficient code. I'm the one driving the code reviews.",
            icon: <Icon icon="tabler:code" />,
        },
        {
            title: "Satisfied partners",
            description:
                "I have a good track record of working with partners to deliver high-quality solutions.",
            icon: <Icon icon="tabler:heart" />,
        },
        {
            title: "And, I can design too",
            description:
                "I have experience with designing user interfaces and user experiences. Good ones, too.",
            icon: <Icon icon="tabler:adjustments-bolt" />,
        },
    ];
    return (
        <div className="max-w-7xl mx-auto rounded-md">
            <BackgroundGradient className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 rounded-md bg-card overflow-hidden">
                {features.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </BackgroundGradient>
        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col [&:not(:last-child)]:lg:border-r py-16 relative group/feature dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800",
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10">{icon}</div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-accent-foreground/20 group-hover/feature:bg-accent-foreground transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block">
                    {title}
                </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};
