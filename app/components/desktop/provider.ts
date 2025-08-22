import type { Desktop } from "@cpluspatch/desktop";

export const key = Symbol() as InjectionKey<{
    desktop: Desktop;
}>;
