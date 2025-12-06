<script setup lang="ts">
import { BookDashed } from "lucide-vue-next";
import { SidebarGroup, SidebarGroupLabel } from "~/components/ui/sidebar";
</script>

<template>
    <SidebarGroup class="grow group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Chats</SidebarGroupLabel>
        <div
            class="border-2 border-muted rounded-md grow border-dotted w-full flex items-center justify-center"
        >
            <div class="flex flex-col items-center justify-center gap-2 p-4">
                <BookDashed class="text-muted-foreground size-8"/>
                <span class="text-muted-foreground text-sm font-semibold"
                    >No chats yet</span
                >
            </div>
        </div>
    </SidebarGroup>
</template>
