<template>
    <div class="max-w-[21cm] w-full mx-auto bg-white p-8 prose prose-sm flex flex-col gap-4">
        <FormHeader title="C-01 FORM" department="Ministry of Health"
            subTitle="Application to Sector/Megacity Clerk for Copy of Intercourse Permission" />

        <RecordTypeSection />

        <PartnerSection title="Partner/Spouse 1" />
        <PartnerSection title="Partner/Spouse 2" />

        <IntercourseInformationSection />

        <ApplicantInfoSection />
    </div>
</template>

<script setup lang="ts">
import ApplicantInfoSection from "./ApplicantInfoSection.vue";
import FormHeader from "./FormHeader.vue";
import IntercourseInformationSection from "./IntercourseInformationSection.vue";
import PartnerSection from "./PartnerSection.vue";
import RecordTypeSection from "./RecordTypeSection.vue";
</script>

<style lang="postcss">
.form-input {
    @apply mt-1 block w-full rounded border-gray-300;
}

.form-grid {
    @apply grid gap-4;
}

@media (max-width: 768px) {
    .form-grid {
        @apply grid-cols-1;
    }
}
</style>