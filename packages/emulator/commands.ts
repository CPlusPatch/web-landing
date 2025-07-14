import { BrowserDetector } from "browser-dtector";
import { Inode, InodeFlags, type InodeFunction } from "./filesystem";

export const cd: InodeFunction = ({ fs, shell }, path) => {
    const targetPath = fs.parsePath(path, shell.cwd);

    if (fs.findInodeByPath(targetPath)) {
        shell.stderr(`cd: "${path}" is not a directory`);
        return;
    }

    if (!fs.isPathADirectory(targetPath)) {
        shell.stderr(`cd: The directory "${path}" does not exist`);
        return;
    }

    shell.cwd = targetPath;
};

export const pwd: InodeFunction = ({ fs, shell }) => {
    shell.stdout(fs.formatPath(shell.cwd));
};

export const ls: InodeFunction = ({ fs, shell }, path = ".") => {
    const children = fs.getDirectoryChildren(fs.parsePath(path, shell.cwd));

    if (!children) {
        // Check whether it cannot be found because it is a file
        const inode = fs.findInodeByPath(fs.parsePath(path, shell.cwd));

        if (inode) {
            shell.stdout(fs.formatPath(inode.path));
            return;
        }

        shell.stderr(`ls: Cannot access '${path}': No such file or directory`);
        return;
    }

    // Filter for children that are deeper than one level
    const paths = children
        .map((child) => child.path)
        .map((childPath) => {
            if (childPath.length === fs.parsePath(path, shell.cwd).length + 1) {
                return childPath;
            }

            return childPath.slice(0, fs.parsePath(path, shell.cwd).length + 1);
        })
        // Deduplicate paths
        .filter(
            (value, index, self) =>
                self.findIndex(
                    (v) =>
                        v.join(fs.options.pathSeparator) ===
                        value.join(fs.options.pathSeparator),
                ) === index,
        );

    shell.stdout(paths.map((path) => path.at(-1)).join("\n"));
};

export const cat: InodeFunction = ({ fs, shell }, path) => {
    const inode = fs.findInodeByPath(fs.parsePath(path, shell.cwd));

    if (!inode) {
        if (fs.isPathADirectory(fs.parsePath(path, shell.cwd))) {
            shell.stderr(`cat: ${path}: Is a directory`);
            return;
        }

        shell.stderr(`cat: ${path}: No such file or directory`);
        return;
    }

    shell.stdout(inode.content);
};

export const echo: InodeFunction = ({ shell }, ...args) => {
    shell.stdout(args.join(" "));
};

export const touch: InodeFunction = ({ fs, shell }, path) => {
    const targetPath = fs.parsePath(path, shell.cwd);
    const name = targetPath.at(-1) || "";

    if (!name) {
        shell.stderr("touch: missing file operand");
        return;
    }

    if (fs.findInodeByPath(targetPath)) {
        shell.stderr(
            `touch: ${path}: File already exists (this ain't that kind of emulator, bud)`,
        );
        return;
    }

    fs.inodes.push(
        new Inode(targetPath, "", InodeFlags.Read | InodeFlags.Write),
    );
};

export const which: InodeFunction = ({ fs, shell }, command) => {
    const inode = fs.tryResolveExecutable(command);

    if (!inode) {
        shell.stderr(`which: ${command}: command not found`);
        return;
    }

    shell.stdout(fs.formatPath(inode.path));
};

export const neofetch: InodeFunction = ({ shell }) => {
    const detector = new BrowserDetector(
        window.navigator.userAgent,
    ).parseUserAgent();

    const fastfetchText = `                                                  jessew@website
  ⠀⠀⠀⠀⠀⢀⣤⠖⠒⠒⠒⢒⡒⠒⠒⠒⠒⠒⠲⠦⠤⢤⣤⣄⣀⠀⠀⠀⠀⠀    --------------
  ⠀⠀⠀⠀⣠⠟⠀⢀⠠⣐⢭⡐⠂⠬⠭⡁⠐⠒⠀⠀⣀⣒⣒⠐⠈⠙⢦⠀⠀⠀    OS: ${detector.name} ${detector.version}
  ⠀⠀⠀⣰⠏⠀⠐⠡⠪⠂⣁⣀⣀⣀⡀⠰⠀⠀⠀⢨⠂⠀⠀⠈⢢⠀⠀⢹⠀⠀    Host: JesseOS (1.2.4)
  ⠀⣠⣾⠿⠤⣤⡀⠤⡢⡾⠿⠿⠿⣬⣉⣷⠀⠀⢀⣨⣶⣾⡿⠿⠆⠤⠤⠌⡳⣄    Kernel: ${detector.platform}
  ⣰⢫⢁⡾⠋⢹⡙⠓⠦⠤⠴⠛⠀⠀⠈⠁⠀⠀⠀⢹⡀⠀⢠⣄⣤⢶⠲⠍⡎⣾    Uptime: Who knows!
  ⢿⠸⠸⡇⠶⢿⡙⠳⢦⣄⣀⠐⠒⠚⣞⢛⣀⡀⠀⠀⢹⣶⢄⡀⠀⣸⡄⠠⣃⣿    Packages: 2067 (jacman), 90 (jatpak)
  ⠈⢷⣕⠋⠀⠘⢿⡶⣤⣧⡉⠙⠓⣶⠿⣬⣀⣀⣐⡶⠋⣀⣀⣬⢾⢻⣿⠀⣼⠃    Shell: jash 0.22.1
  ⠀⠀⠙⣦⠀⠀⠈⠳⣄⡟⠛⠿⣶⣯⣤⣀⣀⣏⣉⣙⣏⣉⣸⣧⣼⣾⣿⠀⡇⠀    Display (${detector.name.toUpperCase()}): 1920x1080 @ 165 Hz in 16" [Built-in]
  ⠀⠀⠀⠘⢧⡀⠀⠀⠈⠳⣄⡀⣸⠃⠉⠙⢻⠻⠿⢿⡿⢿⡿⢿⢿⣿⡟⠀⣧⠀    DE: JNOME 48.1
  ⠀⠀⠀⠀⠀⠙⢦⣐⠤⣒⠄⣉⠓⠶⠤⣤⣼⣀⣀⣼⣀⣼⣥⠿⠾⠛⠁⠀⢿⠀    WM: Jutter (Wayland)
  ⠀⠀⠀⠀⠀⠀⠀⠈⠙⠦⣭⣐⠉⠴⢂⡤⠀⠐⠀⠒⠒⢀⡀⠀⠄⠁⡠⠀⢸⠀    WM Theme: jessew-dark
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠲⢤⣀⣀⠉⠁⠀⠀⠀⠒⠒⠒⠉⠀⢀⡾⠀    Theme: Breeze [Qt], adw-gtk3-dark [GTK2/3/4]
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠲⠦⠤⠤⠤⠤⠴⠞⠋⠀⠀    Icons: breeze-dark [Qt], Adwaita [GTK2/3/4]
                                                  Font: JetBrains Mono (10pt) [Qt], Adwaita Sans (10pt) [GTK2/3/4]
                                                  Cursor: Adwaita (24px)
                                                  Terminal: jtty 1.4.0
                                                  Terminal Font: JetBrainsMono Nerd Font (11pt)
                                                  CPU: JessePU (16) @ 4.50 GHz
                                                  GPU 1: Jvidia RTX 4070 Ti
                                                  Memory: 9.50 GiB / 63.43 GiB (64%)
                                                  Disk (/): 203.76 GiB / 223.54 GiB (91%) - btrfs
                                                  Local IP (wlan0): 192.168.2.154/24
                                                  Locale: en_GB.UTF-8`;

    shell.stdout(fastfetchText);
};

export const help: InodeFunction = ({ fs, shell }) => {
    const executables = fs.inodes.filter(
        (inode) => inode.executable && inode.readable,
    );

    if (executables.length === 0) {
        shell.stdout("No commands available.");
        return;
    }

    shell.stdout("Executables detected in the filesystem:");
    shell.stdout(
        executables
            .map((inode) => ` - ${fs.formatPath(inode.path)}`)
            .join("\n"),
    );
    shell.stdout("Type the name of a command to execute it.");
};
