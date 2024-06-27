<template>
    <section class="form-section">
        <h4 class="font-semibold mb-2">{{ title }}</h4>
        <div class="form-grid grid-cols-3">
            <FormInput label="Name (as recorded on C-01 Licence):" class="md:col-span-2" />
            <FormInput label="Date of Birth:" type="date" />
            <FormInput label="Name used during previous Intercourse, if applicable:" />
            <FormInput label="Residence (at time of intercourse):" class="md:col-span-2" />
        </div>
    </section>
</template>

<script setup lang="ts">
import FormInput from "./FormInput.vue";

defineProps<{
    title: string;
}>();
</script>