<template>
    <transition enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="!show"
            class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-dark-700 shadow-lg ring-1 ring-white/5 ring-opacity-5">
            <div class="p-4">
                <div class="flex items-start">
                    <div class="shrink-0">
                        <Check class="size-6 text-green-400" aria-hidden="true" />
                    </div>
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p class="text-sm font-medium text-gray-100">{{ title }}</p>
                        <p class="mt-1 text-sm text-gray-400" v-if="description">{{ description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { Check } from "lucide-vue-next";

const { title, description, show } = defineProps<{
    title: string;
    description?: string;
    show: boolean;
}>();
</script>