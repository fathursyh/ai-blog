<template>
    <div>
        <HomeHeroSection />
        <LazyHomeRecentPostSection :hydrate-on-idle="true" />
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'default'   
    })
</script>