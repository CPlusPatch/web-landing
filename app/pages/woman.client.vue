<template>
  <div>
    {{ data }}
    <Button @click="decryptData">
        Decrypt
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { armor, Decrypter } from "age-encryption";
import { Button } from "~/components/ui/button";
import encryptedData from "~~/public/data/data.age?raw";
import type { Item } from "~~/types.ts";

const data = ref<Item[] | null>(null);

const decryptData = async (): Promise<void> => {
    const passphrase = prompt("Enter passphrase to view content:") || "";

    const decrypter = new Decrypter();
    decrypter.addPassphrase(passphrase);

    const decoded = armor.decode(encryptedData);
    try {
        const decrypted = await decrypter.decrypt(decoded, "text");
        data.value = JSON.parse(decrypted) as Item[];
    } catch (error) {
        alert("Decryption failed. Please check your passphrase and try again.");
    }
};
</script>