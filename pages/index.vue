<template>
    <div class="bg-gray-50">
        <HomeHeroSection />
        <LazyHomeRecentPostSection :hydrate-on-idle="true" class="mt-10" />
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'default'   
    })
</script>