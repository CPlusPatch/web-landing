<template>
    <Container class="py-36 !max-w-2xl">
        <div class="flex flex-col gap-8">
            <QuoteVue v-for="quote in quotes.toSorted(
                (a, b) => b.date.getTime() - a.date.getTime()
            )" :key="quote.title" :quote="quote" />
        </div>
    </Container>
</template>

<script lang="ts" setup>
import Container from "~/components/containers/big.vue";
import QuoteVue, { type Quote } from "~/components/quotes/quote.vue";

definePageMeta({
    layout: "navbar-and-footer",
});

const jesse: Quote["author"] = {
    name: "Jesse",
    href: "https://cpluspatch.com",
    avatar: "/images/avatars/jessew.png",
};

const quotes: Quote[] = [
    {
        author: jesse,
        image: {
            src: "/images/quotes/7527e8ab-581d-46d4-89f7-615c125b80fa.png",
        },
        date: new Date("2024-01-11 00:15:26 GMT-1000"),
        title: "Do Not The Toilet",
        description:
            "in my defence, this is a reference to some stupid shitpost video",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/45cbb384-6169-493b-abed-7fc0a55e9d74.webp",
        },
        date: new Date("2024-01-12 00:56:40 GMT-1000"),
        title: "Coke",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/b7a258dc-c8cf-4409-942e-e6496b1be81d.webp",
        },
        date: new Date("2024-01-12 14:39:58 GMT-1000"),
        title: "Flabbergasted Luna",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/ca044210-145b-4da4-8170-13193de82891.webp",
        },
        date: new Date("2024-01-14 00:37:00 GMT-1000"),
        title: "Toilet Pt 2: Electric Boogaloo",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/cbfc42ec-e411-4596-93f2-1009b67fab42.webp",
        },
        date: new Date("2024-01-15 11:39:10 GMT-1000"),
        title: "Greedy Mrbeast",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/ed92e5ed-5c19-4a30-be85-df8e7105d982.webp",
        },
        date: new Date("2024-12-29 01:06:52 GMT+0100"),
        title: "Gay Gay Hexadecimal Gay",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/939eb6b0-a21b-4816-8807-46acce9ac1f1.webp",
        },
        date: new Date("2025-01-07 14:36:47 GMT+0100"),
        title: "Furry Conk",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/1af7d045-16ad-4372-b796-73da1e1e685c.webp",
        },
        date: new Date("2025-01-27 13:36:33 GMT+0100"),
        title: "Not Google",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/7df5954d-720b-4fc1-8d47-2d3ab3f29fdb.webp",
        },
        date: new Date("2025-01-29 12:46:29 GMT+0100"),
        title: "Very Angry Birds",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/25b59187-50cf-4bba-b371-661a4a6e34b0.webp",
        },
        date: new Date("2025-01-29 21:50:29 GMT+0100"),
        title: "To Flatulate or Not to Flatulate",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/a0278848-11c8-45e9-9410-f53e67362136.webp",
        },
        date: new Date("2025-01-30 02:18:48 GMT+0100"),
        title: "Mother",
    },
];
</script>