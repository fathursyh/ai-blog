<template>
    <section class="h-[100dvh] bg-gray-900 grid place-items-center">
        <FormsLoginForm />
    </section>
</template>

<script setup lang="ts">
    definePageMeta({
    middleware: 'before-page'
    });
</script>