<template>
         <div class="w-full max-w-xl xl:px-8 xl:w-5/12">
          <div class="bg-gray-50 rounded-md shadow-xl p-7 sm:p-10">
            <h3 class="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                Be an author, start writing
            </h3>
            <form @submit.prevent="registerHandler">
                <div class="mb-1 sm:mb-2">
                <label for="email" class="inline-block mb-1 font-medium">E-mail</label>
                <input
                    id="email"
                    v-model="inputData.email"
                    placeholder="michael@gmail.com"
                  type="text"
                  class="flex-grow w-full h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  name="email"
                  autocomplete="on"
                  max="100"
                >
                <p v-if="errorMsg.email" class="text-xs ps-1 text-red-500">{{ errorMsg.email }}</p>
              </div>
              <div class="mb-1 sm:mb-2">
                <label for="fullName" class="inline-block mb-1 font-medium">Full name</label>
                <input
                id="fullName"
                v-model="inputData.fullName"
                  placeholder="Michael Scott"
                  type="text"
                  class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  name="fullName"
                  maxlength="100"
                >
              </div>
              <div class="mb-1 sm:mb-2">
                <label for="password" class="inline-block mb-1 font-medium">Password</label>
                <input
                id="password"
                v-model="inputData.password"
                  placeholder="password"
                  type="password"
                  class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  name="password"
                  minlength="8"
                >
                <p v-if="errorMsg.password" class="text-xs ps-1 text-red-500">{{ errorMsg.password }}</p>
              </div>
              <div class="mb-1 sm:mb-2">
                <label for="confirmPassword" class="inline-block mb-1 font-medium">Confirm password</label>
                <input
                id="confirmPassword"
                v-model="inputData.confirmPassword"
                  placeholder="confirm password"
                  type="password"
                  class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  name="confirmPassword"
                  minlength="8"
                >
                <p v-if="errorMsg.confirmPassword" class="text-xs ps-1 text-red-500">{{ errorMsg.confirmPassword }}</p>
              </div>
              <div class="mt-4 mb-2 sm:mb-4">
              <UIButton variant="primary" class="w-full" type="submit" :disabled="isLoading">
                Sign up
              </UIButton>
              </div>
              <p class="text-xs text-gray-600 sm:text-sm text-center">
                    Already an author? <NuxtLink class="text-blue-500 underline underline-offset-2" href="/login">Sign in</NuxtLink>
              </p>
            </form>
          </div>
        </div>
</template>

<script setup lang="ts">
  const { register } = useAuth();

    const inputData = reactive({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
    });
    const errorMsg = reactive({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const isLoading = ref(false);

    const registerHandler = async() => {
        isLoading.value = true;
        try {
          await register(inputData.email, inputData.fullName, inputData.password, inputData.confirmPassword);
          showAlert(200, 'Register is succesfull!');
          await navigateTo({path: '/dashboard'});

        } catch(err) {
            if((err as {cause: string}).cause === 'confirmPassword') {
                errorMsg.password = err as string;
                errorMsg.confirmPassword = err as string;
                isLoading.value = false;
                return;
            }
            alert("Something's wrong. Please try again later.")
        }
    }

</script>