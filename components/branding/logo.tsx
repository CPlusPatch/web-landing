import { cn } from "@/lib/utils";
import logo from "@/public/images/icons/logo.svg";
import React from "react";

export const Logo = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            {...props}
            className={cn("flex items-center space-x-2", className)}
        >
            <img
                src={logo.src}
                width={logo.width}
                height={logo.height}
                alt="CPlusPatch logo"
                className="size-8"
            />
            <span className="text-lg font-semibold">CPlusPatch</span>
        </div>
    );
});
