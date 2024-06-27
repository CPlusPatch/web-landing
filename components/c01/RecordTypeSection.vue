<template>
    <section class="form-section flex flex-col gap-4">
        <h4 class="font-semibold">Type of record desired</h4>
        <div class="grid grid-cols-2 gap-4">
            <RecordTypeOption label="Search and Certified Transcript (Certificate)" fee="SC 100.00" />
            <RecordTypeOption label="Search and Certified Copy (Long Form)" fee="SC 100.00" />
        </div>
        <small>
            A C-01 Transcript is an abstract form of the intercourse record issued under the
            seal of the Sector/Megacity administrator. It includes the names of the contracting parties, their
            residence at the time of the C-01 form was issued, date and place of intercourse as well as date and
            place of birth of both of the interested parties. A Certified Transcript may be used as proof that an
            intercourse occurred.
        </small>
        <small>
            A Certified Copy includes all of the items of information occurring on the
            original record of the C-01 form. A Certified Copy may be needed where proof of parentage and certain
            other detailed information may be required such as: Citizenship level, veteran's benefits, court
            proceedings, or settlement of an estate.
        </small>
    </section>
</template>

<script setup lang="ts">
import RecordTypeOption from "./RecordTypeOption.vue";
</script>