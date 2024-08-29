"use client";

import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Link from "next/link";

export default function Home() {
    const isJesse = false;

    const scrollIntoView = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    return (
        <>
            <Navbar />
            <main className="flex flex-col gap-10">
                <div className="relative isolate overflow-hidden">
                    <svg
                        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern
                                id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                                width="200"
                                height="200"
                                x="50%"
                                y="-1"
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg
                            x="50%"
                            y="-1"
                            className="overflow-visible fill-gray-800/20"
                            aria-hidden="true"
                        >
                            <path
                                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                strokeWidth="0"
                            />
                        </svg>
                        <rect
                            width="100%"
                            height="100%"
                            strokeWidth="0"
                            fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
                        />
                    </svg>
                    <div
                        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-orange-500 to-red-600 opacity-20"
                            style={{
                                clipPath: `polygon(
                                73.6% 51.7%,
                                91.7% 11.8%,
                                100% 46.4%,
                                97.4% 82.2%,
                                92.5% 84.9%,
                                75.7% 64%,
                                55.3% 47.5%,
                                46.5% 49.4%,
                                45% 62.9%,
                                50.3% 87.2%,
                                21.3% 64.1%,
                                0.1% 100%,
                                5.4% 51.1%,
                                21.4% 63.9%,
                                58.9% 0.2%,
                                73.6% 51.7%
                            )`,
                            }}
                        />
                    </div>
                    <div className="container pb-24 pt-30 sm:pb-32 lg:flex lg:py-40">
                        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8 mt-20">
                            <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                                {isJesse ? "Hii :3" : "Heya"},<br />
                                I'm {isJesse ? "Jesse 🏳️‍⚧️" : "CPlusPatch"}
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                                I make apps, websites, servers and dreams
                                through FOSS and open standards. I am a student
                                in computer science and a programmer by passion,
                                with several years of experience in many kinds
                                of fields
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <Link href="/contact">
                                    <Button>Contact me</Button>
                                </Link>
                                <Link
                                    href="#philosophy"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollIntoView("philosophy");
                                    }}
                                >
                                    <Button variant="outline">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                                <img
                                    src="/images/assets/banner-2.webp"
                                    alt="VSCode screenshot"
                                    width="2432"
                                    height="1442"
                                    className="w-[76rem] rounded-lg bg-muted/5 shadow-2xl ring-1 ring-muted/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="philosophy" className="relative">
                    <div className="container lg:flex lg:justify-between xl:justify-end">
                        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2 rounded-l-full">
                            <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0 lg:rounded-r-lg overflow-hidden">
                                <img
                                    loading="lazy"
                                    className="absolute inset-y-0 right-0 h-full w-full bg-muted/5 object-cover max-w-6xl"
                                    src="/images/assets/buildings.webp"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="px-6 lg:contents">
                            <div className="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                    My philosophy
                                </h1>
                                <p className="mt-6 text-xl leading-8 text-muted-foreground">
                                    I believe in the power of open source and
                                    open standards. Nearly all of my work is
                                    licensed under a free license such as the
                                    GPLv3, which allows me to work with secure,
                                    extensible and reliable software.
                                </p>
                                <div className="mt-10 max-w-xl text-base leading-7 text-muted-foreground lg:max-w-none">
                                    <p>
                                        While writing code, I adhere to my own
                                        set of principles, which I apply as part
                                        of my philosophy to achieve excellence.
                                        Here are some of the things I believe
                                        in:
                                    </p>
                                    <ul className="mt-8 space-y-6 text-muted-foreground">
                                        <li className="flex gap-x-3">
                                            <Icon
                                                icon="tabler:brand-docker"
                                                className="mt-1 size-5 flex-none text-primary"
                                                aria-hidden="true"
                                            />
                                            <span>
                                                <strong className="font-semibold text-foreground">
                                                    Build Reproducibility
                                                </strong>
                                                I use systems such as Docker or
                                                Nix to build and deploy my
                                                systems in a way that is
                                                reproducible and sandboxed.
                                            </span>
                                        </li>
                                        <li className="flex gap-x-3">
                                            <Icon
                                                icon="tabler:list-check"
                                                className="mt-1 size-5 flex-none text-primary"
                                                aria-hidden="true"
                                            />
                                            <span>
                                                <strong className="font-semibold text-foreground">
                                                    Automatic Linting &
                                                    Formatting
                                                </strong>
                                                My apps are strictly checked for
                                                errors whenever I edit code,
                                                leading to less bugs and
                                                better-looking outputs.
                                            </span>
                                        </li>
                                        <li className="flex gap-x-3">
                                            <Icon
                                                icon="tabler:3d-cube-sphere"
                                                height="none"
                                                className="mt-1 size-5 flex-none text-primary"
                                                aria-hidden="true"
                                            />
                                            <span>
                                                <strong className="font-semibold text-foreground">
                                                    Extensibility and
                                                    Futureproofing
                                                </strong>
                                                Apps should be written with
                                                scaling up in mind, and this is
                                                true of any system. Things
                                                should be done in a way that
                                                they still make sense later on.
                                            </span>
                                        </li>
                                    </ul>
                                    <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">
                                        Security
                                    </h2>
                                    <p className="mt-6">
                                        I am a fervent believer in security and
                                        hardening: all my devices are protected
                                        with full-disk encryption, I follow
                                        industry-standard security practices and
                                        use Linux and open systems with a
                                        hardened configuration everywhere.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
