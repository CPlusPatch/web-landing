<template>
    <section>
        <Container>
            <div class="mx-auto max-w-2xl lg:mx-0">
                <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                    I am a competent, experienced developer with professional skills
                </h2>
                <p class="mt-6 text-base leading-7 text-secondary-foreground">
                    I am a student in computer engineering and a programmer by
                    passion, with several years of experience in many kinds of
                    fields.
                </p>
            </div>
            <div
                class="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
                <div data-phys="true"
                    class="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
                    <p class="flex-none text-3xl font-bold tracking-tight text-gray-900">
                        2,142+
                    </p>
                    <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                        <p class="text-lg font-semibold tracking-tight text-gray-900">
                            Commits per year
                        </p>
                        <p class="mt-2 text-base leading-7 text-secondary">
                            Across all of my projects, I averaged more than
                            2,142 commits this year.
                        </p>
                    </div>
                </div>
                <div data-phys="true"
                    class="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-900 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44">
                    <p class="flex-none text-3xl font-bold tracking-tight text-white">
                        9 years
                    </p>
                    <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                        <p class="text-lg font-semibold tracking-tight text-white">
                            I have more than 9 years of experience in
                            programming
                        </p>
                        <p class="mt-2 text-base leading-7 text-gray-400">
                            Development for macOS, Windows, Linux, Android, iOS,
                            and the Web.
                        </p>
                    </div>
                </div>
                <div data-phys="true"
                    class="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-primary p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
                    <p class="flex-none text-3xl font-bold tracking-tight text-primary-foreground">
                        749,162+
                    </p>
                    <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                        <p class="text-lg font-semibold tracking-tight text-primary-foreground">
                            Lines of code written
                        </p>
                        <p class="mt-2 text-base leading-7 text-secondary-foreground">
                            Including
                            <strong class="font-semibold">713,707</strong> lines
                            of TypeScript, totaled across every project I've kept in source control.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    </section>
</template>

<script lang="ts" setup>
import Container from "~/components/containers/big.vue";
</script>