<template>
      <div class="w-full max-w-sm mx-auto overflow-hidden bg-white md:rounded-lg shadow-md dark:bg-gray-800">
    <div class="px-6 py-4">
        <div class="flex justify-center mx-auto">
            <Icon name="lucide:book-open" class="text-gray-50 text-2xl" />
        </div>

        <h3 class="mt-2 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back!</h3>

        <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Sign in and start writing</p>

        <form @submit.prevent="loginHandler">
            <div class="w-full mt-4">
                <input id="email" v-model="inputData.email" class="block w-full px-4 py-2 mt-2 text-gray-50 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" :class="{'outline-1 outline-red-600' : errorLogin}" type="email" placeholder="Email Address" aria-label="Email Address" autocomplete="email" maxlength="100" @change="errorLogin = false">
                <p v-if="errorLogin" class="text-xs ps-1 mt-1 text-red-600/80">Invalid credentials</p>

            </div>

            <div class="w-full mt-4">
                <input id="password" v-model="inputData.password" class="block w-full px-4 py-2 mt-2 text-gray-50 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" :class="{'outline-1 outline-red-600' : errorLogin}" type="password" placeholder="Password" aria-label="Password" maxlength="100" @change="errorLogin = false">
                <p v-if="errorLogin" class="text-xs ps-1 mt-1 text-red-600/80">Invalid credentials</p>
            </div>

            <UIButton class="mt-8 mb-2 w-full" type="submit" :disabled="isLoading">Login</UIButton>
        </form>
    </div>

    <div class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <a href="" class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Forgot password?</a>
    </div>
</div>
</template>

<script setup lang="ts">
    const { login } = useAuth();
    const isLoading = ref(false);
    const inputData = reactive({
        email: '',
        password: '',
    });
    const errorLogin = ref(false);

    const loginHandler = async() => {
        isLoading.value = true
        try {
            const data = await login(inputData.email, inputData.password);
            if (data) {
                showAlert();
                await navigateTo({path: '/dashboard'});
            }
        } catch(err) {
            console.log(err);
            errorLogin.value = true;
            isLoading.value = false;
            return;
        }
    }
    onMounted(() => {
        document.getElementById('email')?.focus();
    })
</script>