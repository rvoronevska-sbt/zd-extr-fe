<script setup>
import { defineAsyncComponent } from 'vue';
import AppFooter from '../layout/AppFooter.vue';
import AppTopbar from '../layout/AppTopbar.vue';
import Dashboard from './Dashboard.vue';

const ChartDoc = defineAsyncComponent(() => import('./uikit/ChartDoc.vue'));
</script>

<template>
    <AppTopbar />

    <main class="pt-8 px-8">
        <Dashboard />
        <div class="pt-2 my-8">
            <ChartDoc />
        </div>
    </main>

    <AppFooter />
</template>
