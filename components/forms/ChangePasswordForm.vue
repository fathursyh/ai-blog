<template>
    <form @submit.prevent="changePassHandler">
        <h3 class="font-semibold text-xl mb-4">Change your password</h3>
        <div class="flex flex-col mb-2">
            <label for="old" class="text-sm mb-1">Old password</label>
            <input id="old" v-model="password.old" type="password" placeholder="Old password" class="border border-gray-500 p-2 rounded" required>
        </div>
        <div class="flex flex-col mb-4">
            <label for="new" class="text-sm mb-1">New password</label>
            <input id="new" v-model="password.new" type="password" placeholder="New password" class="border border-gray-500 p-2 rounded" required>
        </div>
        <UIButton class="w-full">Change Password</UIButton>
    </form>
</template>

<script setup lang="ts">
    const password = reactive({
        old: '',
        new: '',
    });

    const changePassHandler = async() => {
        if(password.new === '' && password.old === '') return;
        const res = await useAuth().changePassword(password);
        if (!res) {
            showAlert(404, 'Failed to change your password!');
        } else {
            showAlert(200, 'Password changed successfully!');
        }
        useModal().isShow.value = false;
    }

</script>