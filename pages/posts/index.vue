<template>
    <div class="pt-20">
        <LazyFormsSearchPosts section="/posts" />
        <LayoutsPostsWrapper />
        <aside class="sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-8 md:px-24 px-4 mx-auto flex justify-center py-6">
            <LazyUIThePagination section="/posts" />
        </aside>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
    middleware: 'before-page'
    });
</script>