<template>
    <div
        class="p-2 max-w-7xl mx-auto flex items-center justify-center min-h-screen"
    >
        <WomanRenderer v-if="data" :data="data"/>
        <Button v-else @click="decryptData">Decrypt</Button>
    </div>
</template>

<script lang="ts" setup>
import { armor, Decrypter } from "age-encryption";
import { Button } from "~/components/ui/button";
import encryptedData from "~~/public/data/data.age?raw";
import type { Data } from "~~/types.ts";

const data = ref<Data | null>(null);
const passphrase = useLocalStorage<string>("woman-passphrase", "");

onMounted(() => {
    if (passphrase.value) {
        void decryptData();
    }
});

const decryptData = async (): Promise<void> => {
    if (!passphrase.value) {
        const input = prompt(
            "Enter your decryption passphrase (this will be cached):",
        );

        if (input === null) {
            return;
        }

        passphrase.value = input;
    }

    const decrypter = new Decrypter();
    decrypter.addPassphrase(passphrase.value);

    const decoded = armor.decode(encryptedData);
    try {
        const decrypted = await decrypter.decrypt(decoded, "text");
        data.value = JSON.parse(decrypted) as Data;
    } catch (error) {
        alert("Decryption failed. Please check your passphrase and try again.");
        passphrase.value = ""; // Clear invalid passphrase
    }
};
</script>
