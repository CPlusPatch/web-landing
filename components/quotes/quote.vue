<template>
    <article data-phys="true"
        class="hover:drop-shadow-xl duration-200 hover:ring-2 ring-1 p-4 hover:bg-dark-400 ring-white/10 rounded">
        <div class="flex flex-col justify-center gap-4">
            <h3 v-if="quote.title" class="text-lg font-semibold leading-6 text-gray-50">
                {{ quote.title }}
            </h3>
            <p v-if="quote.description" class="line-clamp-3 text-sm leading-6 text-gray-300">
                {{ quote.description }}
            </p>
            <div class="relative">
                <nuxt-img format="webp" width="600" :src="quote.image.src" :alt="quote.image.alt || ''"
                    class="w-full max-h-96 object-contain rounded bg-dark-100" />
                <a title="Download image" :href="quote.image.src" download
                    class="absolute bottom-2 right-2 rounded-md bg-white size-8 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white flex items-center justify-center">
                    <iconify-icon icon="tabler:download" height="none" class="size-4" aria-hidden="true" />
                </a>
            </div>
            <div class="flex mt-4 items-center gap-x-4 text-xs">
                <time data-allow-mismatch :datetime="quote.date.toISOString()" class="text-gray-500">{{
                    formatDate(quote.date)
                }}</time>
            </div>
            <div class="flex items-center gap-x-4">
                <img :src="quote.author.avatar" alt="" class="size-10 rounded bg-dark-100" />
                <div class="text-sm">
                    <p class="text-gray-300 text-xs">
                        Author
                    </p>
                    <p class="font-semibold text-gray-50">
                        {{ quote.author.name }}
                    </p>
                </div>
            </div>
        </div>
    </article>
</template>

<script lang="ts" setup>
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
    }
}
</script>