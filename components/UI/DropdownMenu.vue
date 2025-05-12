<template>
    <div class="relative inline-block text-left">
        <button
            class="inline-flex justify-center items-center w-fit px-4 py-2 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer"
            @click="isOpen = !isOpen"
            @blur="clickOutside"
        >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        <div class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10" :class="{'hidden': !isOpen}" @blur="isOpen = false">
            <button class="block text-left cursor-pointer w-full px-4 py-2 text-sm text-green-700 hover:bg-gray-100 border-b border-gray-200" @click="$emit('onPublish')">{{ published ? 'Unpublish' : 'Publish' }}</button>
            <button class="block text-left cursor-pointer w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="$emit('onEdit')">Edit</button>
            <button class="block text-left cursor-pointer w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100" @click="$emit('onDelete')">Delete</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    const isOpen = ref(false);
    const clickOutside = () => {
        const timer = setTimeout(() => {
            isOpen.value = false;
            clearTimeout(timer);
        }, 200);
    }
    defineProps<{
        published: boolean
    }>()
    defineEmits(['onEdit', 'onPublish', 'onDelete'])
</script>
