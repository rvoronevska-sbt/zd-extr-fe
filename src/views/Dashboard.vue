<script setup>
import StatsWidget from '@/components/StatsWidget.vue';
import TableDoc from './uikit/TableDoc.vue';
// import VipTableDoc from './uikit/VipTableDoc.vue';
</script>

<template>
    <div class="grid grid-cols-12 gap-8 mt-16">
        <StatsWidget />
    </div>
    <TableDoc />
    <!-- <VipTableDoc /> -->
</template>
