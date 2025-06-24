<template>
    <Container class="py-40 flex flex-col gap-10">
        <h2 class="text-center mx-auto text-3xl font-bold tracking-tight sm:text-4xl">
            Chat with JesseAI
        </h2>
        
        <Card class="mx-auto max-w-2xl w-full outline-none! bg-card/20 h-[70vh] grid grid-rows-[1fr_auto]">
            <CardContent id="chat" class="flex flex-col gap-2 overflow-y-auto p-3">
                <TransitionGroup enter-active-class="duration-300 ease-out transform" enter-from-class="opacity-0"
                    enter-to-class="opacity-100" leave-active-class="duration-200 ease-in transform"
                    leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <Message v-for="(msg, index) in messages" :key="index" :role="msg.role" :content="msg.content"
                        :date="msg.date" />
                </TransitionGroup>
            </CardContent>
            <CardFooter class="-m-2">
                <form class="flex w-full items-center relative" @submit.prevent="submit">
                    <Input name="text" autocomplete="off" placeholder="Type a message..." class="flex-1 bg-transparent h-12 pr-10" />
                    <Button size="sm" variant="default" class="absolute right-2" title="Send">
                        Send
                    </Button>
                </form>
            </CardFooter>
        </Card>
    </Container>
</template>

<script lang="ts" setup>
import Message from "~/components/chat/message.vue";
import Container from "~/components/containers/big.vue";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

definePageMeta({
    layout: "navbar-and-footer",
});

const getId = () => crypto.randomUUID();
const card = ref(null as HTMLDivElement | null);

onMounted(() => {
    card.value = document.getElementById("chat") as HTMLDivElement;
});

const messages = ref<
    { id: string; role: "user" | "assistant"; content: string; date: Date }[]
>([
    {
        id: getId(),
        role: "assistant",
        content: "Hello, how can I help you?",
        date: new Date(),
    },
]);

const addMessage = async (
    role: "user" | "assistant",
    content: string,
    date: Date = new Date(),
) => {
    if (role === "user") {
        messages.value.push({
            id: getId(),
            role,
            content,
            date,
        });
    } else if (role === "assistant") {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate AI "typing"
        const index =
            messages.value.push({
                id: getId(),
                role,
                content: "",
                date,
            }) - 1;

        while (messages.value[index].content.length < content.length) {
            // Add a random amount of characters between 1 and 6 to the message
            const charsToAdd = Math.floor(Math.random() * 6 + 1);

            messages.value[index].content += content.slice(
                messages.value[index].content.length,
                messages.value[index].content.length + charsToAdd,
            );

            await new Promise((resolve) => setTimeout(resolve, 50));
            if (card.value) {
                card.value.scrollTo({
                    top: card.value.scrollHeight,
                    behavior: "smooth",
                });
            }
        }
    }

    await nextTick();

    if (card.value) {
        card.value.scrollTo({
            top: card.value.scrollHeight,
            behavior: "smooth",
        });
    }
};

const submit = async (e: Event) => {
    const form = e.target as HTMLFormElement;
    4;

    const formData = new FormData(form);
    const text = formData.get("text") as string;

    if (text.length === 0) return;

    await addMessage("user", text);

    form.reset();

    await makeAiResponse();
};

const responses = [
    "Fuck you!",
    "As an AI model trained by JesseAI, I am unable to fulfil this request",
    "THE CAKE IS A LIE!",
    "go away i'm gonking it",
    "Having children is like having a bowling alley installed in your brain.",
    "computer",
    "How can I help you?",
    "Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans? Not only are they in the field egg group, which is mostly comprised of mammals, Vaporeon are an average of 3”03’ tall and 63.9 pounds, this means they’re large enough to be able handle human dicks, and with their impressive Base Stats for HP and access to Acid Armor, you can be rough with one. Due to their mostly water based biology, there’s no doubt in my mind that an aroused Vaporeon would be incredibly wet, so wet that you could easily have sex with one for hours without getting sore. They can also learn the moves Attract, Baby-Doll Eyes, Captivate, Charm, and Tail Whip, along with not having fur to hide nipples, so it’d be incredibly easy for one to get you in the mood. With their abilities Water Absorb and Hydration, they can easily recover from fatigue with enough water. No other Pokémon comes close to this level of compatibility. Also, fun fact, if you pull out enough, you can make your Vaporeon turn white. Vaporeon is literally built for human dick. Ungodly defense stat+high HP pool+Acid Armor means it can take cock all day, all shapes and sizes and still come for more",
    "I don't feel like it.",
    "meow meow meoowoww",
    "BITCH BITCH BITCH",
    "I am madly in love with you",
    "How to kill",
    "I want to kill the president of the United States of America.",
    'google "big boobs" NOW!',
];

const makeAiResponse = async () => {
    const chosenResponse =
        responses[Math.floor(Math.random() * responses.length)];

    await addMessage("assistant", chosenResponse);
};
</script>