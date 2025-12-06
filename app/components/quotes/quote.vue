<template>
    <Card as="article" class="gap-2 p-4">
        <CardHeader v-if="quote.title || quote.description">
            <CardTitle v-if="quote.title">{{ quote.title }}</CardTitle>
            <CardDescription v-if="quote.description" class="line-clamp-3">
                {{ quote.description }}
            </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
            <div class="relative border rounded">
                <nuxt-img
                    width="600"
                    :src="quote.image.src"
                    :alt="quote.image.alt || ''"
                    format="webp"
                    class="w-full max-h-96 min-h-12 object-contain rounded bg-background"
                />
                <Button
                    as="a"
                    title="Download image"
                    :href="quote.image.src"
                    download
                    class="absolute bottom-2 right-2"
                    size="icon"
                    variant="outline"
                >
                    <Download class="size-4"/>
                </Button>
            </div>
            <NuxtTime
                :datetime="quote.date"
                date-style="long"
                locale="en-GB"
                class="text-xs text-muted-foreground"
            />
        </CardContent>
        <div class="flex items-center gap-x-4">
            <Avatar v-if="quote.author.avatar" class="size-10">
                <AvatarImage :src="quote.author.avatar" alt=""/>
            </Avatar>
            <div>
                <p class="text-secondary-foreground text-xs">Author</p>
                <p class="font-semibold text-sm">{{ quote.author.name }}</p>
            </div>
        </div>
    </Card>
</template>

<script lang="ts" setup>
import { Download } from "lucide-vue-next";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

defineProps<{
    quote: Quote;
}>();

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
};
</script>

<script lang="ts">
export enum QuoteOrigin {
    Fedi = "fedi",
    Matrix = "matrix",
}

export interface Quote {
    image: {
        src: string;
        alt?: string;
    };
    author: {
        name: string;
        href: string;
        avatar?: string;
    };
    origin?: QuoteOrigin;
    title?: string;
    description?: string;
    date: Date;
    uris?: {
        matrix?: string;
        href?: string;
    };
}
</script>
