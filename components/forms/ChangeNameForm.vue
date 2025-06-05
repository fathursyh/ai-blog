<template>
    <form class="flex flex-col items-center gap-4" @submit.prevent="formHandler">
        <h5 class="text-xl font-semibold">Change your detail</h5>
        <input id="name" v-model.trim="name" class="border rounded p-2" type="text" autocomplete="off">
        <input id="job" v-model.trim="job" class="border rounded p-2" type="text" autocomplete="off">
        <UIButton class="w-32">Save</UIButton>
    </form>
</template>

<script setup lang="ts">
    const name = ref(await JSON.parse(sessionStorage.getItem('user')!).fullName);
    const job = ref(await JSON.parse(sessionStorage.getItem('user')!).occupation);
    const defName = name.value;
    const defJob = job.value;
    async function formHandler() {
        if (name.value === defName && job.value === defJob) {
            useModal().isShow.value = false;
            return;
        }
        const [res1, res2] = await Promise.all([useAuthor().changeName(name.value), useAuthor().changeJob(job.value)]);
        if(!res1) showAlert(400, 'Failed to change your name!');
        if(!res2) showAlert(400, 'Failed to change your job!');
        showAlert(200, 'Changes success!');
        useModal().isShow.value = false;
    }

    onMounted(() => {
        document.getElementById('name')?.focus();
    })
</script>