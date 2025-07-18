import type { TemplateRef } from "vue";
import {
    type ChatMessage,
    getRandomResponse,
    simulateFakeTyping,
} from "~/components/chat/chat";

export const useChat = (
    scrollContainer: TemplateRef<HTMLElement | null>,
): {
    messages: Ref<ChatMessage[]>;
    addMessage: (message: string) => Promise<void>;
} => {
    const messages = ref<ChatMessage[]>([
        {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Hello, how can I help you?",
            createdAt: new Date(),
        },
    ]);

    const addMessage = async (message: string) => {
        const newMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: message,
            createdAt: new Date(),
        };

        messages.value.push(newMessage);

        await nextTick();
        if (scrollContainer?.value) {
            await scrollContainer.value.scrollTo({
                top: scrollContainer.value.scrollHeight,
                behavior: "smooth",
            });
        }

        // Wait a few seconds before responding
        await new Promise((r) => setTimeout(r, 1000));

        // Simulate a response from the assistant
        const chosenResponse = getRandomResponse();

        const chunks = simulateFakeTyping(chosenResponse);
        const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "",
            createdAt: new Date(),
        };
        const index = messages.value.push(assistantMessage) - 1;

        for (const chunk of chunks) {
            (messages.value[index] as ChatMessage).content += chunk;
            await nextTick();

            if (scrollContainer?.value) {
                await scrollContainer.value.scrollTo({
                    top: scrollContainer.value.scrollHeight,
                    behavior: "smooth",
                });
            }

            await new Promise((r) => setTimeout(r, 50));
        }
    };

    return {
        messages,
        addMessage,
    };
};
