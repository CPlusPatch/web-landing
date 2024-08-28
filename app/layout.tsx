import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { ReactNode } from "react";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.png" type="image/png" />
            </head>
            <body className={`${inter.className} dark`}>
                <TooltipProvider>
                    <div
                        vaul-drawer-wrapper=""
                        className="min-h-[100vh] bg-background"
                    >
                        {children}
                    </div>
                </TooltipProvider>
            </body>
        </html>
    );
}
