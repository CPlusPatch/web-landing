import mitt from "mitt";

export const WindowDecorationFlags = {
    Minimize: 0x1,
    Maximize: 0x2,
    Close: 0x4,
};

interface WindowOptions {
    initialWidth: number;
    initialHeight: number;
    title?: string;
    decorationFlags: number;
}

export class Window {
    public id: string;
    public appId: string;
    public title: string | undefined;
    public geometry: DOMRect;
    public decorationFlags: number;
    public emitter = mitt<{
        "geometry.update": DOMRect;
    }>();

    public constructor(appId: string, options?: Partial<WindowOptions>) {
        this.id = crypto.randomUUID();
        this.appId = appId;
        this.title = options?.title;
        this.geometry = new DOMRect(
            0,
            0,
            options?.initialWidth ?? 800,
            options?.initialHeight ?? 600,
        );
        this.decorationFlags =
            options?.decorationFlags ??
            WindowDecorationFlags.Minimize |
                WindowDecorationFlags.Maximize |
                WindowDecorationFlags.Close;
    }

    public updateGeometry(geometry: DOMRect): void {
        this.geometry = geometry;
        this.emitter.emit("geometry.update", this.geometry);
    }
}
