<script setup>
import { defineAsyncComponent } from 'vue';
import StatsWidget from '@/components/StatsWidget.vue';

const TableDoc = defineAsyncComponent(() => import('./uikit/TableDoc.vue'));
const VipTableDoc = defineAsyncComponent(() => import('./uikit/VipTableDoc.vue'));
</script>

<template>
    <div class="grid grid-cols-12 gap-8 mt-16">
        <StatsWidget />
    </div>
    <TableDoc />
    <VipTableDoc />
</template>
