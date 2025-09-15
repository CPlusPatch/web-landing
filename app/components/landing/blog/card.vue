<template>
    <Card as="article">
        <NuxtLink class="flex flex-col gap-4" :href="`/blog${post.path}`">
            <CardHeader v-if="post.image" class="w-full">
                <nuxt-img width="500" :src="post.image" alt=""
                    class="aspect-video w-full rounded-sm object-cover sm:aspect-2/1 lg:aspect-3/2" />
            </CardHeader>
            <CardContent class="flex flex-col gap-3">
                <NuxtTime v-if="post.created_at" date-style="long" :datetime="new Date(Number(post.created_at))"
                    class="text-muted-foreground text-xs" locale="en-GB" />
                <CardTitle>
                    {{ post.title }}
                </CardTitle>
                <CardDescription class="line-clamp-3">
                    {{ post.description }}
                </CardDescription>
            </CardContent>
            <CardFooter class="mt-auto flex items-center gap-2">
                <Avatar class="size-10">
                    <AvatarImage src="/images/avatars/jessew.png" alt="" />
                </Avatar>
                <div class="leading-6 flex flex-col gap-0.5">
                    <p class="font-semibold text-sm">
                        Jesse W
                    </p>
                    <p class="text-secondary-foreground text-xs">
                        @CPlusPatch
                    </p>
                </div>
            </CardFooter>
        </NuxtLink>
    </Card>
</template>

<script lang="ts" setup>
import type { ContentCollectionItem } from "@nuxt/content";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

const { post } = defineProps<{
    post: ContentCollectionItem;
}>();
</script>