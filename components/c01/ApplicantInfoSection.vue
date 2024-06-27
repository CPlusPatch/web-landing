<template>
    <section class="form-section">
        <h4 class="font-semibold mb-2">Applicant Info</h4>
        <div class="form-grid grid-cols-2">
            <FormInput label="Signature of Applicant:" />
            <FormInput label="Date:" type="date" />
            <FormInput label="Applicant SuperPhone Number:" />
            <FormInput label="Name of Applicant:" />
        </div>
        <div class="form-grid grid-cols-2 mt-4">
            <FormTextarea label="Name and address where record is to be sent:" rows="3" />
            <FormInput label="SuperMail Address:" placeholder="john.helldiver@mail.gov" />
        </div>
        <div class="form-grid grid-cols-4 mt-4">
            <FormInput label="Address of Applicant:" class="col-span-2" />
            <FormInput label="Megacity:" />
            <FormInput label="Sector:" />
            <FormInput label="ZIP:" />
        </div>
    </section>
</template>

<script setup lang="ts">
import FormInput from "./FormInput.vue";
import FormTextarea from "./FormTextarea.vue";
</script>