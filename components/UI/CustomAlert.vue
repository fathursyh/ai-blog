<template>
    <Teleport to="#teleports">
        <Transition name="fade" mode="out-in">
            <div v-if="notif" class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 fixed bottom-6 md:right-6 right-3 z-50">
                <div class="flex items-center justify-center w-12 " :class="[status == 200 ? 'bg-emerald-400' : 'bg-red-500']">
                    <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
                        />
                    </svg>
                </div>
    
                <div class="px-4 py-2 -mx-3">
                    <div class="mx-3">
                        <span class="font-semibold" :class="[status === 200 ? 'text-emerald-400' : 'text-red-400']">{{ status == 200 ? 'Success' : 'Failed' }}</span>
                        <p class="text-sm text-gray-600 dark:text-gray-200">{{ useAlert().alertBody.value.text }}</p>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
    const notif = useAlert().isShow;
    const status = computed(()=> {
        return useAlert().alertBody.value.status;
    });
</script>