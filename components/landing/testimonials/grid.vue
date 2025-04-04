<script setup lang="ts">
import Container from "~/components/containers/big.vue";

const featuredTestimonial = {
    body: "CPlusPatch is very intelligent and resourceful when it comes to clear, on-point design. No matter what project he is tasked with, you'll get an honest answer, and a quicker turnaround.",
    author: {
        name: "Kio",
        title: "Systems Administrator, Hosting Provider",
        imageUrl: "https://cdn-web.cpluspatch.com/kio_avatar.webp",
        logoUrl:
            "https://s3.kitsunes.club/storage/bf399313-959c-43e1-a225-0e8e6f71a852.png",
    },
};
const testimonials = [
    [
        [
            {
                body: "I got to be witness to CPlusPatch's development of Fedibase, It really showed me how much he can accomplish when he sticks to a project. He was dedicated enough to make a fully featured Fediverse client that I'd argue is on par with other Fediverse clients, and he did it all on his own.",
                author: {
                    name: "Calciume",
                    title: "CS Student",
                    imageUrl:
                        "https://cdn-web.cpluspatch.com/calciume_avatar.webp",
                },
            },
            {
                body: "All of CPlusPatch's projects turn out looking stunning. They make any project look easy, yet you'd be hard-pressed to find someone who works as quick with nearly the same results.",
                author: {
                    name: "[REDACTED]",
                    title: "Developer",
                    imageUrl: "/images/assets/wheatley.jpg",
                },
            },
        ],
        [
            {
                body: "I'm impressed every time I see CPlusPatch working on something. He is extremely dedicated, and always amazes me with the quality and speed of his work. His enthusiasm for his projects is clear every time I talk with him.",
                author: {
                    name: "Autumn",
                    title: "Engineering Student",
                    imageUrl:
                        "https://cdn-web.cpluspatch.com/autumn_avatar.webp",
                },
            },
        ],
    ],
    [
        [
            {
                body: "CPlusPatch is the most talented programmer I have had the pleasure of knowing. He can solve difficult problems using remarkable efficiency and is always happy to assist me with my own projects. Truly a person of all time.",
                author: {
                    name: "Alice",
                    title: "Engineering Student",
                    imageUrl: "https://cdn-web.cpluspatch.com/giggler.webp",
                },
            },
            // More testimonials...
        ],
        [
            {
                body: "CPlusPatch is one of the most skilled and knowledgeable developers I have ever worked with. He is able to take on any task and complete it with ease. He always maintains a positive attitude and a sense of humor, which makes him a joy to work with.",
                author: {
                    name: "Zemi",
                    title: "CS Student",
                    imageUrl: "https://cdn-web.cpluspatch.com/hyper.webp",
                },
            },
            // More testimonials...
        ],
    ],
];
</script>

<template>

    <Container class="!px-0">
        <div class="mx-auto max-w-xl text-center px-6 lg:px-8">
            <h2 class="text-sm font-bold uppercase leading-8 tracking-tight text-orange-600">
                Reviews
            </h2>
            <p class="mt-2 text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
                Many clients satisfied
            </p>
        </div>
        <div class="sm:px-6 lg:px-8 mt-20">
            <div data-phys="true"
                class="relative overflow-hidden bg-dark-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
                <nuxt-img class="absolute inset-0 size-full object-cover brightness-150 saturate-0"
                    src="/images/assets/erik-smiling.jpeg" format="webp" sizes="sm:80vw" quality="40" alt="" />
                <div class="absolute inset-0 bg-dark-900/90 mix-blend-multiply" />
                <div class="absolute -left-80 -top-56 transform-gpu blur-3xl" aria-hidden="true">
                    <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-red-500 to-orange-300 opacity-[0.45]"
                        style="
								clip-path: polygon(
									74.1% 44.1%,
									100% 61.6%,
									97.5% 26.9%,
									85.5% 0.1%,
									80.7% 2%,
									72.5% 32.5%,
									60.2% 62.4%,
									52.4% 68.1%,
									47.5% 58.3%,
									45.2% 34.5%,
									27.5% 76.7%,
									0.1% 64.9%,
									17.9% 100%,
									27.6% 76.8%,
									76.1% 97.7%,
									74.1% 44.1%
								);
							" />
                </div>
                <div class="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl"
                    aria-hidden="true">
                    <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-red-500 to-orange-300 opacity-25"
                        style="
								clip-path: polygon(
									74.1% 44.1%,
									100% 61.6%,
									97.5% 26.9%,
									85.5% 0.1%,
									80.7% 2%,
									72.5% 32.5%,
									60.2% 62.4%,
									52.4% 68.1%,
									47.5% 58.3%,
									45.2% 34.5%,
									27.5% 76.7%,
									0.1% 64.9%,
									17.9% 100%,
									27.6% 76.8%,
									76.1% 97.7%,
									74.1% 44.1%
								);
							" />
                </div>
                <div class="relative mx-auto max-w-none lg:mx-0">
                    <nuxt-img class="h-12 w-auto" sizes="sm:50vw" width="320" height="81" format="webp"
                        src="/images/logos/uden-ai.webp" alt="" />
                    <figure>
                        <blockquote class="mt-6 text-lg font-semibold text-white sm:text-xl sm:leading-8">
                            <p>
                                “Developers that are fast, utilize the
                                newest available technology with ease,
                                swiftly understand what you asked for, and
                                can immerse themselves into your project to
                                make case-by-case decisions in a way you
                                would've made them, are already impossible
                                to find. What makes CPlusPatch extraordinary
                                is not just that, but is aided by the fact
                                that CPlusPatch completes such tasks in a
                                speed you'd expect there to be a full-time
                                paid development team on the other end
                                rather than a singular person.”
                            </p>
                        </blockquote>
                        <figcaption class="mt-6 text-base text-white">
                            <div class="font-semibold">Erik Uden</div>
                            <div class="mt-1">CEO, Uden AI</div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>

        <div
            class="mx-auto mt-16 sm:px-6 lg:px-8 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            <figure data-phys="true"
                class="col-span-2 hidden sm:block sm:rounded-2xl sm:bg-dark-300 ring-1 hover:ring-2 hover:ring-orange-500 duration-200 ring-dark-100 sm:shadow-lg sm:ring-1 xl:col-start-2 xl:row-end-1">
                <blockquote class="p-12 text-xl font-semibold leading-8 tracking-tight text-gray-50">
                    <p>{{ `“${featuredTestimonial.body}”` }}</p>
                </blockquote>
                <figcaption class="flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
                    <nuxt-img class="size-10 flex-none rounded ring-1 ring-dark-500 bg-dark-200" width="40"
                        height="40" format="webp" :src="featuredTestimonial.author.imageUrl" alt="" />
                    <div class="flex-auto">
                        <div class="font-semibold text-white">
                            {{ featuredTestimonial.author.name }}
                        </div>
                        <div
                            class="text-transparent bg-clip-text bg-gradient-to-tl from-fuchsia-500 via-red-600 !to-orange-400">
                            {{ `${featuredTestimonial.author.title}` }}
                        </div>
                    </div>
                    <nuxt-img class="h-10 w-auto flex-none" sizes="sm:2.5rem" :src="featuredTestimonial.author.logoUrl"
                        alt="" />
                </figcaption>
            </figure>
            <div v-for="(columnGroup, columnGroupIdx) in testimonials" :key="columnGroupIdx"
                class="space-y-8 xl:contents xl:space-y-0">
                <div v-for="(column, columnIdx) in columnGroup" :key="columnIdx" :class="[
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                        (columnGroupIdx === testimonials.length - 1 &&
                            columnIdx === columnGroup.length - 1)
                        ? 'xl:row-span-2'
                        : 'xl:row-start-1',
                    'space-y-8',
                ]">
                    <figure v-for="testimonial in column" :key="testimonial.author.name" data-phys="true"
                        class="rounded-2xl sm:bg-dark-300 ring-1 hover:ring-2 hover:ring-orange-500 duration-200 ring-dark-100 p-6 shadow-lg">
                        <blockquote class="text-gray-50">
                            <p>{{ `“${testimonial.body}”` }}</p>
                        </blockquote>
                        <figcaption class="mt-6 flex items-center gap-x-4">
                            <nuxt-img class="size-10 rounded-full ring-1 ring-dark-500 bg-dark-900"
                                :src="testimonial.author.imageUrl" width="40" height="40" format="webp" alt="" />
                            <div>
                                <div class="font-semibold text-white">
                                    {{ testimonial.author.name }}
                                </div>
                                <div
                                    class="text-transparent bg-clip-text bg-gradient-to-tl from-fuchsia-500 via-red-600 !to-orange-400">
                                    {{ `${testimonial.author.title}` }}
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    </Container>
</template>
