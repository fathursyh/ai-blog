<template>
      <div class="w-full max-w-sm mx-auto overflow-hidden bg-white md:rounded-lg shadow-md dark:bg-gray-800">
    <div class="px-6 py-4">
        <div class="flex justify-center mx-auto">
            <Icon name="lucide:book-open" class="text-gray-50 text-4xl" />
        </div>

        <h3 class="mt-2 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back!</h3>

        <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Sign in and start writing</p>

        <form @submit.prevent="loginHandler">
            <div class="w-full mt-4">
                <input v-model="inputData.email" class="block w-full px-4 py-2 mt-2 text-gray-50 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" autocomplete="on" autofocus maxlength="100">
            </div>

            <div class="w-full mt-4">
                <input v-model="inputData.password" class="block w-full px-4 py-2 mt-2 text-gray-50 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" maxlength="100">
            </div>

            <UIButton class="mt-8 mb-2 w-full" type="submit">Login</UIButton>
        </form>
    </div>

    <div class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <a href="" class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Forgot password?</a>
    </div>
</div>
</template>

<script setup lang="ts">

    inject('supabase');
    const inputData = reactive({
        email: '',
        password: '',
    });

    const loginHandler = () => {
        console.log(inputData);
    }
</script>