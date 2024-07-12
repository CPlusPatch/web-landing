"use client";

import type { FC, ReactNode } from "react";
import { useIsClient } from "usehooks-ts";

export const ClientOnly: FC<{
    children: ReactNode;
    placeholder?: ReactNode;
}> = ({ children, placeholder }) => {
    const isClient = useIsClient();

    if (!isClient) {
        return placeholder || null;
    }

    return children;
};
