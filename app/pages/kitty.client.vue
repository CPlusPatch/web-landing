<template>
    <div :class="['w-dvw h-dvh', msUntilAvailable !== null ? 'bg-background' : 'bg-pink-700']">
        <div class="flex flex-col items-center justify-center w-full h-full text-center px-4 gap-4">
            <h1 class="text-4xl font-bold mb-4">Lexi is {{ msUntilAvailable == null ? 'online :3' : 'offline :(' }}</h1>
            <div v-if="msUntilAvailable !== null">
                <Countdown :hours="Math.floor(msUntilAvailable / 3600000)"
                    :minutes="Math.floor((msUntilAvailable % 3600000) / 60000)"
                    :seconds="Math.floor((msUntilAvailable % 60000) / 1000)"
                    :milliseconds="Math.floor((msUntilAvailable % 1000))" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Countdown from "~/components/widgets/countdown.vue";

// 10:00 to 12:00 and 13:00 to 15:00 UTC-04:00
const hoursUnavailable = [
    { start: "14:00", end: "16:00" },
    { start: "17:00", end: "19:00" },
];
const utcOffset = 0;

const getMsUntilAvailable = (currentTime: number): number | null => {
    const currentDate = new Date(currentTime);
    const currentUTCHours = currentDate.getUTCHours();
    const currentUTCMinutes = currentDate.getUTCMinutes();
    const currentTotalMinutes = currentUTCHours * 60 + currentUTCMinutes;

    for (const period of hoursUnavailable) {
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
            const minutesUntilAvailable = endTotalMinutes - currentTotalMinutes;
            return (
                minutesUntilAvailable * 60 * 1000 -
                (currentDate.getSeconds() * 1000 +
                    currentDate.getMilliseconds())
            );
        }
    }

    return null;
};

const timestamp = useTimestamp();
const msUntilAvailable = computed(() => getMsUntilAvailable(timestamp.value));
</script>