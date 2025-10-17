<template>
    <div
        :class="cn('relative flex w-max max-w-3/4 flex-col gap-2 rounded-xl px-3 py-2 text-sm whitespace-pre-wrap ml-auto bg-primary text-primary-foreground')">
        <div>
            {{ content }}
        </div>
        <div class="flex items-center gap-1 justify-end">
            <NuxtTime :datetime="date" time-style="short" class="text-xs" />
            <CheckCheck class="size-4" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CheckCheck } from "lucide-vue-next";
import { cn } from "~/lib/utils";

const { content, date } = defineProps<{
    content: string;
    date: Date;
}>();
</script>