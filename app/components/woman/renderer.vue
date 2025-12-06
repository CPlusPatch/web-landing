<script setup lang="ts">
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Item } from "~~/types";
import { Card } from "../ui/card";

const { items } = defineProps<{
    items: Item[];
}>();
</script>

<template>
    <Card>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[100px]">Name</TableHead>
                    <TableHead>Characteristics</TableHead>
                    <TableHead>Triggers</TableHead>
                    <TableHead>Emotional Distance</TableHead>
                    <TableHead>Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="item in items" :key="item.name">
                    <TableCell class="font-medium">{{ item.name }}</TableCell>
                    <TableCell class="whitespace-pre-wrap">
                        {{ item.characteristics }}
                    </TableCell>
                    <TableCell>{{ item.triggers }}</TableCell>
                    <TableCell class="whitespace-pre-wrap">
                        {{ item.emotional_distance }}
                    </TableCell>
                    <TableCell class="whitespace-pre-wrap">
                        {{ item.notes }}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Card>
</template>
