<template>
    <section class="w-full h-screen 2xl:p-20 lg:p-12 bg-gray-100">
        <div class="flex items-center justify-between max-w-7xl mx-auto">
            <h1 class="font-bold text-gray-700 text-xl ps-4">Your Posts</h1>
            <LazyFormsSearchPosts section="/dashboard/posts" class="mx-0! p-0!" />
        </div>
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
