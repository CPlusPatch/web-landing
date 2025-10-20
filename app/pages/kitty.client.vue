<template>
    <div :class="['w-dvw h-dvh', msUntil !== 0 ? 'bg-background' : 'bg-pink-700']">
        <div class="flex flex-col items-center justify-center w-full h-full text-center px-4 gap-4">
            <h1 class="text-4xl font-bold mb-4">Lexi is {{ msUntil === 0 ? 'online :3' : 'offline :(' }}</h1>
            <div v-if="msUntil !== 0">
                <Countdown :hours="hours"
                    :minutes="minutes"
                    :seconds="seconds"
                    :milliseconds="milliseconds" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Countdown from "~/components/widgets/countdown.vue";

// 10:00 to 12:00 and 13:00 to 15:00 UTC-04:00
const unavailableHours = [
    { start: "14:00", end: "16:00" },
    { start: "17:00", end: "19:00" },
];
const utcOffset = 0;

/**
 * Find the next available time based on current time and unavailable periods.
 * @param currentTime
 * @returns Date of next available time or null if currently available
 */
const getNextAvailableTime = (currentTime: Date): Date | null => {
    const currentUTCHours = currentTime.getUTCHours();
    const currentUTCMinutes = currentTime.getUTCMinutes();
    const currentTotalMinutes = currentUTCHours * 60 + currentUTCMinutes;

    for (const period of unavailableHours) {
        const [startHour, startMinute] = period.start
            .split(":")
            .map(Number) as [number, number];
        const [endHour, endMinute] = period.end.split(":").map(Number) as [
            number,
            number,
        ];

        const startTotalMinutes =
            ((startHour - utcOffset + 24) % 24) * 60 + startMinute;
        const endTotalMinutes =
            ((endHour - utcOffset + 24) % 24) * 60 + endMinute;

        if (
            currentTotalMinutes >= startTotalMinutes &&
            currentTotalMinutes < endTotalMinutes
        ) {
            const nextAvailable = new Date(currentTime);
            nextAvailable.setUTCHours(
                (endHour - utcOffset + 24) % 24,
                endMinute,
                0,
                0,
            );
            return nextAvailable;
        }
    }

    return null;
};

const nextAvailableTime = computed(() => {
    const now = new Date();
    return getNextAvailableTime(now);
});

const { msUntil, milliseconds, seconds, minutes, hours } =
    useCountdown(nextAvailableTime);
</script>