<template>
    <section class="row-span-2 col-span-2 rounded-lg border border-gray-400 shadow p-8 flex flex-col justify-center items-center text-lg">
            <h3 class="font-bold text-xl mb-4">Your Profile</h3>
            <div class="w-32 h-32 bg-gray-300 rounded-full grid place-items-center mb-2">
                <span class="text-2xl font-bold">{{ initials }}</span>
            </div>
            <p>{{ user.fullName }}</p>
        </section>
</template>

<script setup lang="ts">
    const user = ref(await useAuthor().getAuthorData());
    const initials = computed(()=>{
        const username = user.value?.fullName.split(' ');
        return username[0][0] + username[1][0];
    });

    watch([useAlert().isShow], async() => {
        user.value = await useAuthor().getAuthorData();
    })
</script>