<script setup lang="ts">
useServerSeoMeta({
    title: "Contact",
    ogTitle: "Contact",
    author: "Gaspard Wierzbinski",
    ogImage: "/images/assets/banner-2.webp",
    ogImageAlt: "A screenshot of VSCode open",
    description:
        "I make apps, websites, servers and dreams through FOSS and open standards. I am a student in computer engineering and a programmer by passion, with several years of experience in many kinds of fields",
    ogDescription:
        "I make apps, websites, servers and dreams through FOSS and open standards. I am a student in computer engineering and a programmer by passion, with several years of experience in many kinds of fields",
    ogLocale: "en-US",
    ogLocaleAlternate: ["fr-FR", "en-US"],
});

const contactMethods = [
    {
        name: "Signal",
        href: "https://signal.me/#eu/mdX6iV0ayndNmJst43sNtlw3eFXgHSm7if4Y/mwYT1+qFDzl1PFAeroW+RpHGaRu",
        icon: "tabler:message-circle",
    },
    {
        name: "Matrix",
        href: "https://matrix.to/#/@jesse:cpluspatch.dev",
        icon: "tabler:brand-matrix",
    },
    {
        name: "Email",
        href: "mailto:contact@cpluspatch.com",
        icon: "tabler:mail",
    },
];
</script>

<template>
    <HeadersNavbar />

    <div class="px-4 md:px-6 py-24 mx-auto max-w-7xl">
        <div class="mx-auto mt-20">
            <h2 class="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
                How to contact me
            </h2>
            <p class="mt-6 text-lg leading-8 text-gray-300 max-w-xl">
                You can contact me through various means, such as Matrix, Email
                or Signal. Please use Signal first for communication or send an
                email if it's not the kind of message that needs a conversation.
            </p>
        </div>
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <a v-for="method in contactMethods" :key="method.name" :href="method.href" target="_blank"
                referrerpolicy="no-referrer"
                class="flex flex-col items-center space-y-4 bg-white/5 hover:bg-white/10 duration-200 hover:shadow-xl hover:ring-2 ring-orange-500 rounded p-8">
                <iconify-icon :icon="method.icon" height="none" class="size-12 text-gray-50" />
                <span class="text-gray-50 font-semibold">
                    {{ method.name }}
                </span>
            </a>
        </div>
    </div>

    <FootersFooter />
</template>
