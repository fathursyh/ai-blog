<template>
    <form class="flex flex-col items-center gap-4" @submit.prevent="formHandler">
        <h5 class="text-xl font-semibold">Change your name</h5>
        <input id="name" v-model.trim="name" class="border rounded p-2" type="text">
        <UIButton class="w-32 disabled:cursor-not-allowed!" :disabled="name === defName">Save</UIButton>
    </form>
</template>

<script setup lang="ts">
    const name = ref(await useAuthor().getAuthorData().then(data => data?.fullName));
    const defName = name.value;
    async function formHandler() {
        const res = await useAuthor().changeName(name.value);
        if(!res) showAlert(400, 'Failed to change your name!');
        showAlert(200, 'Success to change your name!');
        useModal().isShow.value = false;
    }

    onMounted(() => {
        document.getElementById('name')?.focus();
    })
</script>