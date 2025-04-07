<template>
    <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-full"
        enter-to-class="transform translate-y-0"
        leave-active-class="transition duration-300 ease-out"
        leave-from-class="transform translate-y-0"
        leave-to-class="transform -translate-y-full">
        <div v-show="showing" class="fixed top-0 right-0 z-50 flex items-center justify-center w-full">
            <Widget ref="widget" />
        </div>
    </Transition>
</template>

<script lang="ts" setup>
// biome-ignore lint/style/useImportType: <explanation>
import Widget from "./widget.client.vue";

const widget = useTemplateRef<InstanceType<typeof Widget>>("widget");
const showing = ref(false);
const { f12 } = useMagicKeys({
    onEventFired: (e) => {
        if (e.key === "F12") {
            e.preventDefault();
        }
    },
    passive: false,
});

watchEffect(() => {
    if (f12.value) {
        showing.value = !showing.value;
    }
});

watchEffect(async () => {
    if (showing.value) {
        await nextTick();
        // Wait for the widget to be mounted
        widget.value?.focus();
    }
});
</script>