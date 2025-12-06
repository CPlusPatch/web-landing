<template>
    <section class="flex flex-col gap-8">
        <div>
            <h2
                class="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl"
            >
                Inbox
            </h2>
            <p
                class="mt-6 text-lg leading-8 text-secondary-foreground max-w-xl"
            >
                Go ahead, send me an anonymous message, you coward. It'll pop up
                on my phone.
            </p>
        </div>
        <form action="#" @submit.prevent="submit">
            <div
                class="rounded-md border shadow-xs focus-within:outline-2 outline-primary/80 max-w-2xl"
            >
                <Label for="title" class="sr-only">Title</Label>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    class="bg-transparent! border-0! ring-0! h-12 font-semibold"
                    placeholder="Title"
                />
                <Label for="messageBody" class="sr-only">Message body</Label>
                <Textarea
                    rows="3"
                    name="messageBody"
                    id="messageBody"
                    class="resize-none border-0! bg-transparent! ring-0!"
                    placeholder="I like your website, consider adding more Portal 2 songs."
                />
                <div class="flex items-center justify-end p-2">
                    <Button type="submit">
                        <Send/>
                        Blaze it
                    </Button>
                </div>
            </div>
        </form>
    </section>
</template>

<script lang="ts" setup>
import { Send } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const submit = async (event: Event) => {
    const form = event.target as HTMLFormElement;
    const titleElement = form.elements.namedItem("title") as HTMLInputElement;
    const messageBodyElement = form.elements.namedItem(
        "messageBody",
    ) as HTMLTextAreaElement;

    const title = titleElement.value;
    const messageBody = messageBodyElement.value;

    if (!messageBody) {
        return;
    }

    const { ok, text } = await fetch("https://ntfy.sh/3MFIHQw4F23Gs7dz", {
        method: "PUT",
        body: messageBody,
        headers: {
            Title: title || "New message",
        },
    });

    if (!ok) {
        alert("Failed to send message. Check console for more information.");
        console.error(await text());

        return;
    }

    toast.success("Message sent!", {
        duration: 5000,
    });

    // Reset the form
    titleElement.value = "";
    messageBodyElement.value = "";
};
</script>
