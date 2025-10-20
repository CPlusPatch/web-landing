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
const unavailableHours: {
    start: [number, number];
    end: [number, number];
}[] = [
    { start: [10, 0], end: [12, 0] },
    { start: [13, 0], end: [15, 0] },
];
const utcOffset = -4;

/**
 * Get the next occurrence of a specific time (hours and minutes) in UTC.
 * @param hours
 * @param minutes
 * @param now
 */
const getNextTime = (
    hours: number,
    minutes: number,
    now = new Date(),
): Date => {
    const nextTime = new Date(now);
    nextTime.setUTCHours((hours - utcOffset + 24) % 24, minutes, 0, 0);

    if (nextTime <= now) {
        nextTime.setUTCDate(nextTime.getUTCDate() + 1);
    }

    return nextTime;
};

/**
 * Find the next available time based on current time and unavailable periods.
 * @param currentTime
 * @returns Date of next available time or null if currently available
 */
const getNextAvailableTime = (currentTime: Date): Date | null => {
    for (const period of unavailableHours) {
        const startTime = new Date(currentTime);
        startTime.setUTCHours(
            (period.start[0] - utcOffset + 24) % 24,
            period.start[1],
            0,
            0,
        );

        const endTime = new Date(currentTime);
        endTime.setUTCHours(
            (period.end[0] - utcOffset + 24) % 24,
            period.end[1],
            0,
            0,
        );

        if (currentTime >= startTime && currentTime < endTime) {
            return getNextTime(period.end[0], period.end[1], currentTime);
        }
    }

    return new Date(0);
};

const nextAvailableTime = computed(() => {
    const now = new Date();
    return getNextAvailableTime(now);
});

const { msUntil, milliseconds, seconds, minutes, hours } =
    useCountdown(nextAvailableTime);
</script>