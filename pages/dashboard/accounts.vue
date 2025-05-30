<template>
    <div class="w-full h-full lg:p-20 p-4 grid lg:grid-cols-3 lg:grid-rows-2 gap-4 py-8 overflow-x-hidden relative">
        <DashboardAccountsUserSettingSection />
        <DashboardAccountsProfileSection />
        <LazyUICustomModal v-if="modal"  />
    </div>
</template>

<script setup lang="ts">
    const modal = computed(() => useModal().isShow.value);

   definePageMeta({
        layout: 'dashboard-layout',
        pageTransition: {css: true, mode: 'out-in', name: 'fade'},
    });
</script>

