import mitt from "mitt";
import type { Window } from "./window.ts";

export interface DesktopOptions {
    wallpaper: URL | null;
}

export class Desktop {
    public options: DesktopOptions;
    private windows: Window[] = [];
    private geometry: DOMRect;
    public emitter = mitt<{
        "window.update": Window[];
        "geometry.update": DOMRect;
        "wallpaper.update": URL | null;
    }>();

    public constructor(options?: Partial<DesktopOptions>) {
        this.options = {
            wallpaper: options?.wallpaper ?? null,
        };
        this.geometry = new DOMRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight,
        );
    }

    public addWindow(window: Window): void {
        this.windows.push(window);
        this.emitter.emit("window.update", this.windows);
    }

    public removeWindow(window: Window): void {
        this.windows = this.windows.filter((w) => w.id !== window.id);
        this.emitter.emit("window.update", this.windows);
    }

    public updateGeometry(geometry: DOMRect): void {
        this.geometry = geometry;
        this.recalculateWindowPositions();
    }

    /**
     * Recalculates the positions of all windows within the desktop.
     *
     * Moves windows if they exceed the desktop boundaries.
     */
    private recalculateWindowPositions(): void {
        for (const window of this.windows) {
            if (window.geometry.x < 0) {
                window.updateGeometry(
                    new DOMRect(
                        0,
                        window.geometry.y,
                        window.geometry.width,
                        window.geometry.height,
                    ),
                );
            }
            if (window.geometry.y < 0) {
                window.updateGeometry(
                    new DOMRect(
                        window.geometry.x,
                        0,
                        window.geometry.width,
                        window.geometry.height,
                    ),
                );
            }
            if (
                window.geometry.x + window.geometry.width >
                this.geometry.width
            ) {
                window.updateGeometry(
                    new DOMRect(
                        this.geometry.width - window.geometry.width,
                        window.geometry.y,
                        window.geometry.width,
                        window.geometry.height,
                    ),
                );
            }
            if (
                window.geometry.y + window.geometry.height >
                this.geometry.height
            ) {
                window.updateGeometry(
                    new DOMRect(
                        window.geometry.x,
                        this.geometry.height - window.geometry.height,
                        window.geometry.width,
                        window.geometry.height,
                    ),
                );
            }
        }
    }
}
