<template>
    <div v-if="state === BrowserState.Loading" class="w-full h-full flex items-center justify-center">
        <Loader2 class="animate-spin size-4" />
    </div>
    <div v-else-if="state === BrowserState.Error" class="w-full h-full flex items-center justify-center">
        <p class="text-red-500">Error loading content</p>
    </div>
    <iframe title="Web Content" v-else-if="state === BrowserState.Loaded" ref="iframe" :srcdoc="srcdocContent" :sandbox="sandboxAttributes" class="w-full h-full border-none" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import html from "./injected.html?raw";

const props = defineProps<{
    url?: string;
}>();

const iframeRef = useTemplateRef<HTMLIFrameElement>("iframe");
const srcdocContent = ref<string>("");
const sandboxAttributes = ref<string>("");
enum BrowserState {
    Loading = "loading",
    Error = "error",
    Loaded = "loaded",
}
const state = ref<BrowserState>(BrowserState.Loading);

// Default sandbox permissions (all except allow-top-navigation)
const defaultSandbox =
    "allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation";

const proxies = [
    "https://api.allorigins.win/raw?url=",
    "https://api.codetabs.com/v1/proxy/?quest=",
    "https://cors-anywhere.herokuapp.com/",
];

/**
 * Fetches content through CORS proxies with fallback support
 */
const fetchProxy = async (
    url: string,
    options?: RequestInit,
    proxyIndex = 0,
): Promise<Response> => {
    try {
        const response = await fetch(
            proxies[proxyIndex] + encodeURIComponent(url),
            options,
        );

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        return response;
    } catch (error) {
        if (proxyIndex === proxies.length - 1) {
            throw error;
        }
        return fetchProxy(url, options, proxyIndex + 1);
    }
};

/**
 * Loads content from the specified URL through proxy
 */
const load = async (url?: string, options?: RequestInit): Promise<void> => {
    if (!url) {
        srcdocContent.value = "";
        return;
    }

    state.value = BrowserState.Loading;

    const code = `<head$1>\n<base href="${url}">\n${html}`;

    try {
        const response = await fetchProxy(url, options);
        const data = await response.text();

        if (data) {
            // Inject base href and navigation handlers
            const processedData = data
                .replace(/<head([^>]*)>/i, code)
                .replace(/ crossorigin=['"][^'"]*['"]/gi, "");

            srcdocContent.value = processedData;
            state.value = BrowserState.Loaded;
        }
    } catch (error) {
        console.error("Cannot load FrameBypass:", error);
        state.value = BrowserState.Error;
    }
};

/**
 * Handles navigation messages from iframe content
 */
const handleMessage = (event: MessageEvent) => {
    if (event.data?.type === "navigate") {
        const { url: newUrl, method, body } = event.data;
        load(newUrl, { method, body });
    }
};

watch(
    () => props.url,
    (newUrl) => {
        load(newUrl);
    },
    { immediate: true },
);

onMounted(() => {
    sandboxAttributes.value = defaultSandbox;

    window.addEventListener("message", handleMessage);

    // Expose load method to iframe content
    if (iframeRef.value) {
        // @ts-expect-error Types are incorrect i think
        iframeRef.value.load = load;
    }
});

onUnmounted(() => {
    window.removeEventListener("message", handleMessage);
});
</script>