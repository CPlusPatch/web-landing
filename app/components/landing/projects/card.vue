<template>
    <Card as="li">
        <CardHeader>
            <nuxt-img class="aspect-3/2 w-full rounded-sm object-cover border" :src="image" width="400"
                alt="" />
        </CardHeader>
        <CardContent class="gap-4 flex flex-col">
            <CardTitle>
                {{ name }}
            </CardTitle>
            <CardDescription>
                {{ description }}
            </CardDescription>
            <ul class="flex gap-4 list-none flex-wrap">
                <li v-for="link in links" :key="link.name">
                    <a :href="link.href" target="_blank" rel="noreferrer" :title="link.name">
                        <LinkIcon class="size-6" />
                    </a>
                </li>
            </ul>
        </CardContent>
        <CardFooter :class="[
            'font-semibold -mx-6 -mb-6 rounded-b-xl px-4 py-2 justify-center mt-auto text-primary-foreground',
            featured ? 'bg-primary' : 'bg-background',
        ]">
            {{ featured ? "Featured" : "Project" }}
        </CardFooter>
    </Card>
</template>

<script lang="ts" setup>
import { LinkIcon } from "lucide-vue-next";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

defineProps<{
    name: string;
    description: string;
    image: string;
    featured?: boolean;
    links: {
        name: string;
        icon: string;
        href: string;
    }[];
}>();
</script>
