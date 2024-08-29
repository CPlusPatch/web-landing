"use client";

import { Navbar } from "@/components/navigation/navbar";
import { FeaturesGrid } from "@/components/ui/bento";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { WobbleCard } from "@/components/ui/wobble-card";
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
                            }}
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full p-8 mt-40">
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 h-full bg-orange-800 min-h-[350px] lg:min-h-[300px]"
                        className=""
                    >
                        <div className="max-w-xs">
                            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                749,162+ lines of code written
                            </h2>
                            <p className="mt-4 text-left  text-base/6 text-neutral-200">
                                Including 713,707 lines of TypeScript, totaled
                                across every project I've kept in source
                                control.
                            </p>
                        </div>
                        <img
                            src="/images/assets/banner-2.webp"
                            width={500}
                            height={500}
                            alt="Screenshot of a Visual Studio Code window"
                            className="absolute -right-[40%] -bottom-10 object-contain rounded"
                        />
                    </WobbleCard>
                    <WobbleCard containerClassName="col-span-1 min-h-[300px]">
                        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            2,142+ commits per year
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                            Across all of my projects, I averaged more than
                            2,142 commits this year.
                        </p>
                    </WobbleCard>
                    <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-zinc-900 min-h-[350px] xl:min-h-[300px]">
                        <div className="max-w-sm">
                            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                9 years
                            </h2>
                            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                                I have more than 9 years of experience in
                                development for the web, desktop, and mobile
                                platforms.
                            </p>
                        </div>
                        <img
                            src="/images/assets/banner-2.webp"
                            width={500}
                            height={500}
                            alt="Screenshot of a Visual Studio Code window"
                            className="absolute -right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded"
                        />
                    </WobbleCard>
                </div>
            </main>
        </>
    );
}
