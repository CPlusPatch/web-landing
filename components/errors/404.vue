<script setup lang="ts">
useHead({
    title: "404 Error",
});
</script>

<template>
    <div class="text-center grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <p class="text-base font-semibold text-orange-400">404</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-50 sm:text-5xl">
            Page not found
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-300">
            Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
            <NuxtLink to="/"
                class="rounded-md group bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                Go back home
                <ButtonsAnimatedArrow />
            </NuxtLink>
        </div>
    </div>
</template>
