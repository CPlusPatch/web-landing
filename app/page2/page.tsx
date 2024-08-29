"use client";

import { Navbar } from "@/components/navigation/navbar";
import { FeaturesGrid } from "@/components/ui/bento";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import hero from "@/public/images/assets/banner-2.webp";
import { motion } from "framer-motion";
import React from "react";

export default function Home() {
    const isJesse = false;

    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <Navbar />
            <main
                className="flex flex-col gap-10 pb-40 relative"
                ref={scrollContainerRef}
            >
                <ShootingStars minDelay={1000} maxDelay={1100} />
                <StarsBackground />
                <ContainerScroll
                    scrollContainerRef={scrollContainerRef}
                    titleComponent={
                        <motion.h1
                            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
                            initial={{ marginBottom: "0.5rem" }}
                            animate={{ marginBottom: "6rem" }}
                            transition={{
                                duration: 1,
                                bounce: 0.25,
                                type: "spring",
                            }} // Adjust the duration as needed
                        >
                            {isJesse ? "Hii :3" : "Heya"},<br />
                            I'm {isJesse ? "Jesse 🏳️‍⚧️" : "CPlusPatch"}
                        </motion.h1>
                    }
                >
                    <img
                        src={hero.src}
                        alt="Banner"
                        className="rounded-2xl object-cover h-full mx-auto"
                        width={hero.width}
                        height={hero.height}
                    />
                </ContainerScroll>

                <FeaturesGrid />
            </main>
        </>
    );
}
