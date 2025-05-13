<template>
    <div class="flex">
        <NavigationsAppSidebar class="transition-all duration-300" :class="[showSide ? 'basis-sm' : 'lg:basis-16 basis-12']" :show="showSide" @click-show="showSide = !showSide" />
        <main class="w-full h-screen basis-full overflow-y-auto bg-gray-100" @click="showSide = false">
            <slot />
        </main>
        <Teleport to="#teleports">
            <UIAddButton />
            <UICustomAlert />
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    const showSide = ref(false);
</script>