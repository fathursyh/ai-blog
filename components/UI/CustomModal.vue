<template>
    <div v-if="useModal().isShow" class="w-screen h-screen fixed bg-black/50 grid place-items-center z-50 top-0">
            <div class="min-w-md min-h-64 rounded-md bg-white shadow-xl grid place-items-center relative" role="dialog">
                <button class="absolute top-4 right-6 cursor-pointer" @click="closeModal"><LazyIcon name="lucide:circle-x" class="text-2xl text-red-700"/></button>
                <LazyFormsChangeNameForm v-if="type === FormType.Name"  />
            </div>
        </div>
</template>

<script setup lang="ts">
    import { FormType } from '~/shared/types/generalInterfaces';
    const closeModal = () => {
        useModal().isShow.value = false;
    }

    const type = computed(() => {
        return useModal().modalType.value;
    })
</script>

