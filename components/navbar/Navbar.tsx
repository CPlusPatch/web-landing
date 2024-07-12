import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

import { type FC, type ReactNode, useEffect, useState } from "react";
import { AnimatedArrow } from "../decorations/AnimatedArrow";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer";
import { NewsBar } from "./NewsBar";
import { ProductItem, type ProductItemProps } from "./ProductItem";

/**
 * Product information for the navigation menu
 */
const products: ProductItemProps[] = [
    {
        name: "Lysand",
        description:
            "Highly standardized federation protocol that's easy to use and understand.",
        icon: "tabler:world-www",
        href: "https://lysand.org",
    },
    {
        name: "Lysand Server",
        description:
            "Reference implementation of the Lysand protocol. Fast, lightweight and configurable.",
        icon: "tabler:server",
        href: "https://github.com/lysand-org/lysand",
    },
    {
        name: "Join Mastodon",
        description:
            "A landing page for mastodon.de, a social media with no ads, no tracking, and no algorithms. Made with Nuxt.js and Tailwind CSS.",
        icon: "tabler:brand-mastodon",
        href: "https://join-mastodon.de",
    },
    {
        name: "KitsuLife",
        description:
            "Website for the Kitsu service suite, showcasing features and the community for Kitsu.",
        icon: "tabler:social",
        href: "https://kitsu.life",
    },
];

/**
 * Current news information
 */
const currentNews = {
    id: "lysand3",
    title: "Lysand 3.0",
    description: "Lysand 3.0 is now available!",
    linkText: "Read the docs",
    href: "https://lysand.org",
};

/**
 * Navbar component
 */
export const Navbar: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [closedNews, setClosedNews] = useLocalStorage<string[]>(
        "closedNews",
        [],
    );
    const [hasLocalStorageLoaded, setHasLocalStorageLoaded] = useState(false);

    useEffect(() => {
        setHasLocalStorageLoaded(true);
    }, []);

    return (
        <header className="z-10 bg-background/30 backdrop-blur-lg fixed top-0 inset-x-0">
            <NewsBar
                news={currentNews}
                closedNews={closedNews}
                setClosedNews={setClosedNews}
                hasLocalStorageLoaded={hasLocalStorageLoaded}
            />
            <nav className="container flex items-center justify-between p-6">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">CPlusPatch</span>
                        <Image
                            className="h-8 w-auto"
                            src="/images/icons/logo.svg"
                            alt="CPlusPatch Logo"
                            width={229}
                            height={229}
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <MobileMenu
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        products={products}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
                            onClick={() => setIsOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Icon
                                icon="tabler:menu-2"
                                className="size-6"
                                aria-hidden="true"
                                width="none"
                            />
                        </Button>
                    </MobileMenu>
                </div>
                <NavigationMenu className="hidden lg:flex lg:gap-x-12">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-sm !bg-transparent font-semibold leading-6 text-foreground">
                                Projects
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 grid-rows-2 lg:w-[800px]">
                                    <NavigationMenuLink asChild={true}>
                                        <Link
                                            className="flex h-full w-full col-start-1 row-span-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                            <Icon
                                                icon="tabler:charts"
                                                className="size-6"
                                                width="none"
                                            />
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                CPlusPatch
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Designed for simplicity. Built
                                                for performance. Made for you.
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                    {products.map((product) => (
                                        <li
                                            key={product.name}
                                            className="[&:nth-child(2n)]:col-start-2 [&:nth-child(2n+1)]:col-start-3"
                                        >
                                            <ProductItem {...product} />
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link
                                href="/blog"
                                legacyBehavior={true}
                                passHref={true}
                            >
                                <NavigationMenuLink className="text-sm font-semibold leading-6 text-foreground">
                                    Blog
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link
                                href="/contact"
                                legacyBehavior={true}
                                passHref={true}
                            >
                                <NavigationMenuLink className="text-sm font-semibold leading-6 text-foreground">
                                    Contact
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link
                        href="https://github.com/cpluspatch/web-landing"
                        target="_blank"
                        className="text-sm font-semibold group leading-6 text-foreground flex items-center"
                    >
                        Source Code
                        <AnimatedArrow />
                    </Link>
                </div>
            </nav>
        </header>
    );
};

/**
 * Mobile menu component
 */
const MobileMenu: FC<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    products: ProductItemProps[];
    children: ReactNode;
}> = ({ isOpen, setIsOpen, products, children }) => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild={true}>{children}</DrawerTrigger>
        <DrawerContent>
            <div className="max-w-xl w-full mx-auto">
                <DrawerHeader>
                    <DrawerTitle>
                        <Link
                            href="/"
                            className="px-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="sr-only">CPlusPatch</span>
                            <Image
                                className="h-8 w-auto"
                                src="/images/icons/logo.svg"
                                alt="CPlusPatch Logo"
                                width={229}
                                height={229}
                            />
                        </Link>
                    </DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                    <div className="flex flex-col gap-y-4">
                        <Accordion type="single" collapsible={true}>
                            <AccordionItem value="item-1">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    asChild={true}
                                >
                                    <AccordionTrigger>
                                        Projects
                                    </AccordionTrigger>
                                </Button>
                                <AccordionContent className="py-4">
                                    <ul className="space-y-2">
                                        {products.map((product) => (
                                            <li key={product.name}>
                                                <ProductItem
                                                    {...product}
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Link href="/blog" onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className="w-full">
                                Blog
                            </Button>
                        </Link>
                        <Link href="/contact" onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className="w-full">
                                Contact
                            </Button>
                        </Link>
                        <Link
                            href="https://github.com/cpluspatch/web-landing"
                            target="_blank"
                            onClick={() => setIsOpen(false)}
                        >
                            <Button variant="outline" className="w-full">
                                Source Code
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </DrawerContent>
    </Drawer>
);
