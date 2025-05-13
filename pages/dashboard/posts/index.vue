<template>
    <section class="w-full h-screen 2xl:p-30 lg:p-12 bg-gray-100">
        <h1 class="text-center font-bold text-gray-700 text-xl mb-2">Your Posts</h1>
        <LayoutsDashboardPostsWrapper />
        <div class="max-w-7xl flex justify-end mx-auto">
            <LazyUIThePagination class="my-4" section="/dashboard/posts" :hydrate-on-idle="true" />
        </div>
    </section>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: "dashboard-layout",
        pageTransition: { css: true, mode: "out-in", name: "fade" },
    });
</script>
