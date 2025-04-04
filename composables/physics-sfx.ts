const soundEffectInfo = {
    // Gravity gun
    holdloop: {
        path: "/halflife/audio/physcannon_hold_loop.mp3",
        volume: 0.2,
        loop: true,
    },
    select: {
        path: "/halflife/audio/physcannon_select.mp3",
        volume: 0.3,
    },
    weaponswitch: {
        path: "/halflife/audio/physcannon_return.mp3",
        volume: 0.3,
    },
    pickup: {
        path: "/halflife/audio/physcannon_pickup.mp3",
        volume: 0.3,
    },
    open: {
        path: "/halflife/audio/physcannon_claws_open.mp3",
        volume: 0.3,
        stops: ["close"],
    },
    close: {
        path: "/halflife/audio/physcannon_claws_close.mp3",
        volume: 0.3,
        stops: ["open"],
    },
    drop: {
        path: "/halflife/audio/physcannon_drop.mp3",
        volume: 0.3,
    },
    dryfire: {
        path: "/halflife/audio/physcannon_dryfire.mp3",
        volume: 0.3,
    },

    // Combine
    pickupthecan: {
        paths: [
            "/halflife/audio/pickupthecan1.mp3",
            "/halflife/audio/pickupthecan2.mp3",
            "/halflife/audio/pickupthecan3.mp3",
        ],
        volume: 0.1,
    },
    putitinthetrash: {
        paths: [
            "/halflife/audio/putitinthetrash1.mp3",
            "/halflife/audio/putitinthetrash2.mp3",
        ],
        volume: 0.1,
        stops: ["pickupthecan"],
    },
    allrightyoucango: {
        path: "/halflife/audio/allrightyoucango.mp3",
        volume: 0.1,
        stops: ["pickupthecan", "putitinthetrash"],
    },
    chuckle: {
        path: "/halflife/audio/chuckle.mp3",
        volume: 0.08,
    },
    help: {
        path: "/halflife/audio/help.mp3",
        volume: 0.22,
        delay: 150, // ms
    },

    // Advisor
    advisor: {
        path: "/halflife/audio/AdvisorScreenVx03.mp3",
        volume: 0.2,
    },

    // Zombie
    zombie: {
        path: "/halflife/audio/zombie_die2.mp3",
        volume: 0.2,
    },

    // Antlion
    antlion: {
        path: "/halflife/audio/antlion_pain1.mp3",
        volume: 0.2,
    },
};

class CSoundEffectState {
    audioBuffers: AudioBuffer[] = []; // AudioBuffer[]
    currentAudioSource: AudioBufferSourceNode | null = null; // AudioSource
    gainNode: GainNode | null = null; // GainNode

    onLoaded: Promise<void> | null = null;
    pendingPlayRequestID: number | null = null;
    nextAudioIndex = 0;
    isPlaying = false;
}

export class CSoundEffects {
    soundStates: Map<string, CSoundEffectState> = new Map(); // Map<string, CSoundEffectState>
    audioCtx = new window.AudioContext();
    nextPlayRequestID = 1;

    constructor() {
        // Wait for all the other content to load; don't block that just to preload sounds.
        window.addEventListener(
            "load",
            () => {
                this.startLoading();
            },
            { once: true },
        );
    }

    async stopSound(name: string) {
        if (this.soundStates.size === 0) {
            return;
        }

        const state = this.soundStates.get(name);
        if (!state) {
            console.error("Unknown sound effect:", name);
            return;
        }

        state.currentAudioSource?.stop();
        state.pendingPlayRequestID = null;
    }

    async playSound(name: string) {
        this.startLoading();

        const state = this.soundStates.get(name);
        if (!state) {
            console.error("Unknown sound effect:", name);
            return;
        }

        // @ts-expect-error
        const info = soundEffectInfo[name];

        const playRequestID = this.nextPlayRequestID++;
        state.pendingPlayRequestID = playRequestID;
        if (!info.loop) {
            // If it's not a looping sound, don't play this specific sound request
            // if loading takes longer than a few hundred ms.
            setTimeout(() => {
                state.pendingPlayRequestID = null;
            }, info.delay + 500);
        }

        await state.onLoaded; // Wait for the load (instant if loaded)

        if (info.delay > 0) {
            await new Promise((resolve) => setTimeout(resolve, info.delay));
        }

        if (state.pendingPlayRequestID !== playRequestID) {
            return;
        }

        this.stopSound(name);
        for (const soundToStop of info.stops) {
            this.stopSound(soundToStop);
        }

        state.currentAudioSource = this.audioCtx.createBufferSource();
        state.currentAudioSource.buffer =
            state.audioBuffers[state.nextAudioIndex];
        state.currentAudioSource.loop = info.loop;
        state.currentAudioSource.connect(state.gainNode as GainNode);
        state.currentAudioSource.onended = () => {
            state.isPlaying = false;
        };
        state.currentAudioSource.start();

        state.isPlaying = true;
        state.nextAudioIndex = (state.nextAudioIndex + 1) % info.paths.length;
    }

    startLoading() {
        if (this.soundStates.size > 0) {
            return;
        }

        for (const name of Object.keys(soundEffectInfo)) {
            // @ts-expect-error
            const info = soundEffectInfo[name] as {
                path?: string;
                paths?: string[];
                volume: number;
                delay?: number;
                stops: string[];
            };
            if (info.path) {
                info.paths = [info.path];
            }
            info.delay = info.delay ?? 0;
            info.stops = info.stops ?? [];

            const state = new CSoundEffectState();

            state.gainNode = this.audioCtx.createGain();
            state.gainNode.gain.value = info.volume;
            state.gainNode.connect(this.audioCtx.destination);

            if (!info.paths) {
                throw new Error(`No paths for sound effect: ${name}`);
            }

            state.onLoaded = Promise.all(
                info.paths.map(async (path) => {
                    const arrayBuffer = await fetch(path).then((res) =>
                        res.arrayBuffer(),
                    );
                    const audioBuffer =
                        await this.audioCtx.decodeAudioData(arrayBuffer);
                    state.audioBuffers.push(audioBuffer);
                }),
            ) as unknown as Promise<void>;

            this.soundStates.set(name, state);
        }

        this.createDebugUI();
    }

    createDebugUI() {
        const elemContainer = document.querySelector("#sounddebug ul");
        if (!elemContainer) {
            return;
        }

        elemContainer.innerHTML = "";

        for (const name of this.soundStates.keys()) {
            const state = this.soundStates.get(name);
            // @ts-expect-error
            const info = soundEffectInfo[name];

            const li = document.createElement("li");
            elemContainer.appendChild(li);

            const button = document.createElement("button");
            li.appendChild(button);
            button.innerText = name;
            button.disabled = true;
            state?.onLoaded?.then(() => {
                button.disabled = false;
            });
            button.onclick = () => {
                if (info.loop && state?.isPlaying) {
                    this.stopSound(name);
                } else {
                    this.playSound(name);
                }
            };
        }
    }
}
