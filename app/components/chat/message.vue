<template>
    <div
        :class="cn('relative flex w-max max-w-3/4 flex-col gap-2 rounded-xl px-3 py-2 text-sm whitespace-pre-wrap', $style.bubble, role === 'user' ? 'ml-auto bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary rounded-bl-none', role === 'user' ? $style['bubble-user'] : $style['bubble-assistant'])"
    >
        <div>{{ content }}</div>
        <div class="flex items-center gap-1 justify-end">
            <NuxtTime :datetime="date" time-style="short" class="text-xs"/>
            <CheckCheck class="size-4"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CheckCheck } from "lucide-vue-next";
import { cn } from "~/lib/utils";

const { role, content, date } = defineProps<{
    role: "user" | "assistant";
    content: string;
    date: Date;
}>();
</script>

<style lang="css" module>
.bubble::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 0.75rem;
    height: 0.75rem;
    background-color: inherit;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
}

.bubble-assistant::before {
    left: -0.71rem;
    mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='3' height='3'%3E%3Cpath d='M0 3h3V0c0 1-2 3-3 3'/%3E%3C/svg%3E");
}

.bubble-user::before {
    left: 100%;
    mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='3' height='3'%3E%3Cpath d='M0 3h3C2 3 0 1 0 0'/%3E%3C/svg%3E");
}
</style>
