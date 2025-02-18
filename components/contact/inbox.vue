<template>
    <section class="flex flex-col gap-8">
        <div>
            <h2 class="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
                Inbox
            </h2>
            <p class="mt-6 text-lg leading-8 text-gray-300 max-w-xl">
                Go ahead, send me an anonymous message, you coward. It'll pop up on my phone.
            </p>
        </div>
        <form action="#" @submit.prevent="submit">
            <Notification title="Message sent" :show="showNotification" class="mb-10" />
            <div
                class="rounded-md border border-white/20 shadow-sm focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 max-w-2xl">
                <label for="title" class="sr-only">Title</label>
                <input type="text" name="title" id="title"
                    class="block w-full bg-transparent border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
                    placeholder="Title" />
                <label for="messageBody" class="sr-only">Message body</label>
                <textarea rows="3" name="messageBody" id="messageBody"
                    class="block w-full resize-none border-0 py-0 bg-transparent text-gray-100 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="I like your website, consider adding more Portal 2 songs."></textarea>
                <div class="flex items-center justify-end p-2">
                    <button type="submit"
                        class="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Blaze
                        it</button>
                </div>
            </div>
        </form>
    </section>
</template>

<script lang="ts" setup>
import Notification from "./notification.vue";

const showNotification = ref(false);

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

    showNotification.value = true;
    setTimeout(() => {
        showNotification.value = false;
    }, 5000);

    // Reset the form
    titleElement.value = "";
    messageBodyElement.value = "";
};
</script>