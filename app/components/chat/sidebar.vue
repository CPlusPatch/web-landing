<script setup lang="ts">
import { Images, Search, SquarePen } from "lucide-vue-next";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    type SidebarProps,
    SidebarRail,
} from "~/components/ui/sidebar";
import SmallLogo from "../logos/SmallLogo.vue";
import SidebarChats from "./sidebar-chats.vue";

const props = defineProps<SidebarProps>();
</script>

<template>
    <Sidebar class="[--sidebar-width:18rem]" v-bind="props">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                        <SmallLogo/>
                        <div
                            class="grid flex-1 text-left text-sm leading-tight"
                        >
                            <span class="truncate font-semibold">Jesse AI</span>
                            <span class="truncate text-xs"
                                >Pro Max Mode Plus Ultra</span
                            >
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem class="mt-2">
                    <SidebarMenuButton>
                        <SquarePen/>
                        New Chat
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                        <Search/>
                        Search Chats
                    </SidebarMenuButton>
                    <SidebarMenuButton>
                        <Images/>
                        Images
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarChats/>
        </SidebarContent>
        <SidebarRail/>
    </Sidebar>
</template>
