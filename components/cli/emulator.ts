class FileSystemFile {
    constructor(
        public path: string[],
        public content: string,
    ) {}

    get name() {
        return this.path.at(-1) || "";
    }
}

class FileSystemDirectory {
    constructor(
        public path: string[],
        public files: FileSystemFile[] = [],
        public directories: FileSystemDirectory[] = [],
    ) {}

    get name() {
        return this.path.at(-1) || "";
    }
}

export class FileSystemEmulator {
    private pathSeparator = "/";

    public constructor(
        public root: FileSystemDirectory,
        public currentPath: string[] = [""],
    ) {}

    private resolvePath(
        path: string,
    ): FileSystemDirectory | FileSystemFile | null {
        // Handle absolute paths
        if (path.startsWith(this.pathSeparator)) {
            return this.resolveAbsolutePath(path);
        }

        // Handle relative paths
        return this.resolveRelativePath(path);
    }

    private resolveAbsolutePath(
        path: string,
    ): FileSystemDirectory | FileSystemFile | null {
        const parts = path.split(this.pathSeparator).filter((p) => p !== "");
        let current: FileSystemDirectory | FileSystemFile = this.root;

        for (const part of parts) {
            if (!(current instanceof FileSystemDirectory)) {
                return null; // Can't traverse into a file
            }

            const dir: FileSystemDirectory | undefined =
                current.directories.find((d) => d.name === part);
            if (dir) {
                current = dir;
                continue;
            }

            const file: FileSystemFile | undefined = current.files.find(
                (f) => f.name === part,
            );

            if (file) {
                current = file;
                continue;
            }

            return null;
        }

        return current;
    }

    private resolveRelativePath(
        path: string,
    ): FileSystemDirectory | FileSystemFile | null {
        const parts = path.split(this.pathSeparator).filter((p) => p !== "");
        let current: FileSystemDirectory | FileSystemFile = this.root;
        const tempPath = [...this.currentPath];

        // First navigate to current directory
        for (const part of tempPath) {
            if (!(current instanceof FileSystemDirectory)) {
                return null;
            }
            const dir: FileSystemDirectory | undefined =
                current.directories.find((d) => d.name === part);
            if (!dir) return null;
            current = dir;
        }

        // Then handle relative path parts
        for (const part of parts) {
            if (part === ".") continue;
            if (part === "..") {
                if (tempPath.length > 0) {
                    tempPath.pop();
                    current = this.root;
                    for (const p of tempPath) {
                        if (!(current instanceof FileSystemDirectory))
                            return null;
                        const dir: FileSystemDirectory | undefined =
                            current.directories.find((d) => d.name === p);
                        if (!dir) return null;
                        current = dir;
                    }
                }
                continue;
            }

            if (!(current instanceof FileSystemDirectory)) {
                return null; // Can't traverse into a file
            }

            const dir: FileSystemDirectory | undefined =
                current.directories.find((d) => d.name === part);
            if (dir) {
                current = dir;
                tempPath.push(part);
                continue;
            }

            const file: FileSystemFile | undefined = current.files.find(
                (f) => f.name === part,
            );
            if (file) {
                current = file;
                continue;
            }

            return null;
        }

        return current;
    }

    public ls(path = "."): (FileSystemFile | FileSystemDirectory)[] {
        const target = this.resolvePath(path);
        if (!target || !(target instanceof FileSystemDirectory)) {
            return [];
        }
        return [...target.files, ...target.directories];
    }

    public cd(path: string): boolean {
        const target = this.resolvePath(path);

        if (!target || !(target instanceof FileSystemDirectory)) {
            return false;
        }

        // Set currentPath to the path of the target directory
        this.currentPath = target.path;
        return true;
    }

    public pwd(): string {
        return this.pathSeparator + this.currentPath.join(this.pathSeparator);
    }

    public mkdir(name: string): boolean {
        const currentDir = this.resolvePath(".") as FileSystemDirectory;
        if (
            !currentDir ||
            currentDir.directories.some((d) => d.name === name)
        ) {
            return false;
        }
        currentDir.directories.push(
            new FileSystemDirectory([...currentDir.path, name], [], []),
        );
        return true;
    }

    public touch(path: string, content = ""): boolean {
        const name = path.split(this.pathSeparator).at(-1);
        const dirname =
            path
                .split(this.pathSeparator)
                .slice(0, -1)
                .join(this.pathSeparator) || ".";

        if (!name) {
            return false;
        }

        let dir = this.resolvePath(dirname);
        if (!dir) {
            dir = this.resolvePath(".");
        }

        if (!(dir instanceof FileSystemDirectory)) {
            return false;
        }

        dir.files.push(new FileSystemFile([...dir.path, name], content));
        return true;
    }

    public cat(path: string): string | null {
        const target = this.resolvePath(path);

        if (!target || !(target instanceof FileSystemFile)) {
            return null;
        }

        return target.content;
    }
}

export const demoFilesystemDirectory = new FileSystemDirectory(
    [],
    [],
    [
        new FileSystemDirectory(
            ["home"],
            [],
            [
                new FileSystemDirectory(
                    ["home", "jessew"],
                    [],
                    [
                        new FileSystemDirectory(["home", "jessew", "Desktop"]),
                        new FileSystemDirectory(
                            ["home", "jessew", "Documents"],
                            [
                                new FileSystemFile(
                                    ["home", "jessew", "Documents", "test.txt"],
                                    "Hello, world!",
                                ),
                            ],
                        ),
                        new FileSystemDirectory([
                            "home",
                            "jessew",
                            "Downloads",
                        ]),
                        new FileSystemDirectory(["home", "jessew", "Music"]),
                        new FileSystemDirectory(["home", "jessew", "Pictures"]),
                        new FileSystemDirectory(["home", "jessew", "Videos"]),
                    ],
                ),
            ],
        ),
    ],
);
