<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
</script>

<template>
    <main>
        <FloatingConfigurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div class="rounded-[56px] p-[0.3rem] bg-[linear-gradient(180deg,rgba(247,149,48,0.4)_10%,rgba(247,149,48,0)_30%)]">
                    <div class="rounded-[53px] w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center">
                        <div class="gap-4 flex flex-col items-center">
                            <div class="h-[3.2rem] w-[3.2rem] flex justify-center items-center border-2 border-emerald-500 rounded-full">
                                <i class="text-emerald-500 pi pi-fw pi-lock text-2xl!"></i>
                            </div>
                            <h1 class="text-surface-900 dark:text-surface-0 font-bold text-4xl lg:text-5xl mb-2">Access Denied</h1>
                            <span class="text-muted-color mb-8">You do not have the necessary permisions. Please contact admins.</span>
                            <img src="/assets/images/access/asset-access.svg" alt="Access denied" class="mb-8" width="440" height="316" />
                            <div class="col-span-12 mt-8 text-center">
                                <Button id="access-go-back-to-login-button" aria-label="access-go-back-to-login" as="router-link" label="Go back to Login" to="/login" severity="warn" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
