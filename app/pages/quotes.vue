<template>
    <Container class="py-36 max-w-2xl!">
        <div class="relative">
            <Search
                class="pointer-events-none absolute left-4 top-3.5 size-5 text-muted-foreground" />
            <Input
                class="h-12 w-full pl-11 pr-4"
                placeholder="Search..." v-model="filter" />
        </div>

        <div class="flex flex-col gap-8 mt-4">
            <QuoteVue v-for="quote in quotesToRender" :key="quote.title" :quote="quote" />
        </div>
    </Container>
</template>

<script lang="ts" setup>
import fz from "fuzzysort";
import { Search } from "lucide-vue-next";
import Container from "~/components/containers/big.vue";
import QuoteVue, { type Quote } from "~/components/quotes/quote.vue";
import { Input } from "~/components/ui/input";

definePageMeta({
    layout: "navbar-and-footer",
});

useSeoMeta({
    title: "Quotes",
    description: "Quotes of questionable quality. No refunds.",
});

const jesse: Quote["author"] = {
    name: "Jesse",
    href: "https://cpluspatch.com",
    avatar: "/images/avatars/jessew.png",
};

const filter = ref<string>("");

const quotesToRender = computed(() => {
    if (!filter.value) {
        return quotes.toSorted((a, b) => b.date.getTime() - a.date.getTime());
    }

    return fz
        .go(
            filter.value,
            quotes.toSorted((a, b) => b.date.getTime() - a.date.getTime()),
            {
                key: "title",
            },
        )
        .map((result) => result.obj);
});

const quotes: Quote[] = [
    {
        author: jesse,
        image: {
            src: "/images/quotes/7527e8ab-581d-46d4-89f7-615c125b80fa.png",
        },
        date: new Date("2024-01-11T00:15:26-10:00"),
        title: "Do Not The Toilet",
        description:
            "in my defence, this is a reference to some stupid shitpost video",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/45cbb384-6169-493b-abed-7fc0a55e9d74.webp",
        },
        date: new Date("2024-01-12T00:56:40-10:00"),
        title: "Coke",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/b7a258dc-c8cf-4409-942e-e6496b1be81d.webp",
        },
        date: new Date("2024-01-12T14:39:58-10:00"),
        title: "Flabbergasted Luna",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/ca044210-145b-4da4-8170-13193de82891.webp",
        },
        date: new Date("2024-01-14T00:37:00-10:00"),
        title: "Toilet Pt 2: Electric Boogaloo",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/cbfc42ec-e411-4596-93f2-1009b67fab42.webp",
        },
        date: new Date("2024-01-15T11:39:10-10:00"),
        title: "Greedy Mrbeast",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/ed92e5ed-5c19-4a30-be85-df8e7105d982.webp",
        },
        date: new Date("2024-12-29T01:06:52-10:00"),
        title: "Gay Gay Hexadecimal Gay",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/939eb6b0-a21b-4816-8807-46acce9ac1f1.webp",
        },
        date: new Date("2025-01-07T14:36:47+01:00"),
        title: "Furry Conk",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/1af7d045-16ad-4372-b796-73da1e1e685c.webp",
        },
        date: new Date("2025-01-27T13:36:33+01:00"),
        title: "Not Google",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/7df5954d-720b-4fc1-8d47-2d3ab3f29fdb.webp",
        },
        date: new Date("2025-01-29T12:46:29+01:00"),
        title: "Very Angry Birds",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/25b59187-50cf-4bba-b371-661a4a6e34b0.webp",
        },
        date: new Date("2025-01-29T21:50:29+01:00"),
        title: "To Flatulate or Not to Flatulate",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/a0278848-11c8-45e9-9410-f53e67362136.webp",
        },
        date: new Date("2025-01-30T02:18:48+01:00"),
        title: "Mother",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/d7436643-edb8-45a0-b88b-7113033f0157.png",
        },
        date: new Date("2025-01-31T13:48:30+01:00"),
        uris: {
            matrix: "https://matrix.to/#/#lounge:envs.net/$6UnWbqJwbGt5MrLYTsccqdUq0OmJUwu0771bnrPXHpk",
        },
        title: "She Diddled Her Roomba",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/83b0f633-896a-4564-a9f0-6e0f370b13ae.png",
        },
        date: new Date("2025-01-31T15:49:21+01:00"),
        uris: {
            matrix: "https://matrix.to/#/#lounge:envs.net/$s6gOQJD621nPYUhFVaIXEoodxo39TMwykc5NKHwW0JA",
        },
        title: "The Cum Sub",
    },
    {
        author: jesse,
        image: {
            src: "/images/quotes/bfa07f23-3849-4675-9a99-7821417cbed3.png",
        },
        date: new Date("2025-01-27T14:06:32+01:00"),
        uris: {
            matrix: "https://matrix.to/#/#lounge:envs.net/$lLTpbNVI_I8mumJ2ARF6GK0NVb1SORSkyF3quOuI3nM",
        },
        title: "Jesse on AI Slop",
    },
];
</script>