<template>
    <section class="form-section">
        <h4 class="font-semibold mb-2">Intercourse Information</h4>
        <div class="form-grid grid-cols-2">
            <FormInput label="Place where the C-01 form was issued:" />
            <FormInput label="Place where the Intercourse was performed:" />
            <FormInput label="C-01 form ID:" />
            <FormInput label="Local registration ID:" />
            <FormInput label="Purpose for which record is required:" />
            <FormInput label="Date of Intercourse or period covered by search:" type="date" />
            <FormInput label="In what capacity are you acting?" />
            <FormInput label="Relationship to person whose record is required:" placeholder="Marriage" />
        </div>
    </section>
</template>

<script setup lang="ts">
import FormInput from "./FormInput.vue";
</script>