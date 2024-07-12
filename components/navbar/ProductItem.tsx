import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import type { FC } from "react";

export interface ProductItemProps {
    name: string;
    description: string;
    icon: string;
    href: string;
    onClick?: () => void;
}

export const ProductItem: FC<ProductItemProps> = ({
    name,
    description,
    icon,
    href,
    onClick,
}) => (
    <Link
        href={href}
        target="_blank"
        className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        onClick={onClick}
    >
        <div className="text-sm font-medium leading-none flex flex-row items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-muted group-hover:bg-background duration-200 ring-1 ring-primary-foreground/10">
                <Icon
                    icon={icon}
                    className="size-6 text-muted-foreground group-hover:text-primary"
                    aria-hidden="true"
                    width="none"
                />
            </div>
            {name}
        </div>
        <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
            {description}
        </p>
    </Link>
);
