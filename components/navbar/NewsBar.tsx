import { Button } from "@/components/ui/button";
import { Icon } from "@iconify-icon/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { FC } from "react";
import { AnimatedArrow } from "../decorations/AnimatedArrow";

interface NewsBarProps {
    news: {
        id: string;
        title: string;
        description: string;
        linkText: string;
        href: string;
    };
    closedNews: string[];
    setClosedNews: (closedNews: string[]) => void;
    hasLocalStorageLoaded: boolean;
}

export const NewsBar: FC<NewsBarProps> = ({
    news,
    closedNews,
    setClosedNews,
    hasLocalStorageLoaded,
}) => {
    if (closedNews.includes(news.id) || !hasLocalStorageLoaded) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="relative isolate flex items-center gap-x-6 overflow-hidden bg-background px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
            >
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 w-full">
                    <p className="text-sm text-foreground">
                        <strong className="font-semibold">{news.title}</strong>
                        &nbsp;•&nbsp;{news.description}
                    </p>
                    <Link
                        href={news.href}
                        target="_blank"
                        className="text-sm font-semibold text-foreground group"
                    >
                        {news.linkText}
                        <AnimatedArrow />
                    </Link>
                </div>
                <div className="flex justify-end">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                        onClick={() => setClosedNews([...closedNews, news.id])}
                    >
                        <span className="sr-only">Dismiss</span>
                        <Icon
                            icon="tabler:x"
                            className="size-5 text-foreground"
                            aria-hidden="true"
                            width="none"
                        />
                    </Button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
