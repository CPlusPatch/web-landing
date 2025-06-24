<template>
    <SidebarProvider>
        <ChatSidebar />
        <SidebarInset class="bg-card/20 max-h-dvh overflow-hidden relative">
            <div id="chat" class="h-full *:max-w-2xl *:w-full *:mx-auto overflow-y-auto">
                <div class="flex flex-col gap-2 px-3 pt-10 pb-40">
                    <TransitionGroup enter-active-class="duration-300 ease-out transform" enter-from-class="opacity-0"
                        enter-to-class="opacity-100" leave-active-class="duration-200 ease-in transform"
                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <Message v-for="(msg, index) in messages" :key="index" :role="msg.role" :content="msg.content"
                            :date="msg.createdAt" />
                    </TransitionGroup>
                </div>
                <div class="absolute bottom-4 inset-x-0 px-2">
                    <form class="flex w-full items-center relative" @submit.prevent="submit">
                        <Input name="text" autocomplete="off" placeholder="Type a message..."
                            class="bg-card! h-12 px-4 border-none" />
                        <Button size="icon" variant="default" class="absolute right-2" title="Send">
                            <ArrowUp class="size-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </SidebarInset>
    </SidebarProvider>
</template>

<script lang="ts" setup>
import { ArrowUp } from "lucide-vue-next";
import Message from "~/components/chat/message.vue";
import ChatSidebar from "~/components/chat/sidebar.vue";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { useChat } from "~/composables/Chat";

definePageMeta({
    layout: "default",
});

const card = ref(null as HTMLDivElement | null);
const { messages, addMessage } = useChat(card);

onMounted(() => {
    card.value = document.getElementById("chat") as HTMLDivElement;
});

const submit = async (e: Event) => {
    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);
    const text = formData.get("text") as string;

    if (text.length === 0) {
        return;
    }

    form.reset();
    await addMessage(text);
};
</script>