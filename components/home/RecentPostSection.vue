<template>
    <section class="bg-gray-50 max-w-screen-xl mx-auto border-b border-dashed border-gray-300">
        <div v-if="!isLoading" class="container px-6 py-10 mx-auto">
            <div class="lg:flex lg:mx-6">
                <div class="lg:w-3/4 lg:px-6">
                    <NuxtLink :to="'/posts/' + first?.slug">
                        <NuxtImg
                            class="object-cover object-center w-full h-80 xl:h-[28rem] rounded-xl"
                            src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="trending post"
                        />
                    </NuxtLink>

                    <div>
                        <p class="mt-6 text-sm text-blue-500 uppercase">{{ first?.tags_id.name }}</p>

                        <NuxtLink :to="'/posts/' + first?.slug" class="max-w-lg mt-4 text-2xl font-semibold leading-tight text-gray-800">
                            {{ first?.title }}
                        </NuxtLink>

                        <div class="flex items-center mt-6">
                            <NuxtImg
                                class="object-cover object-center w-10 h-10 rounded-full"
                                src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                                alt=""
                            />

                            <div class="mx-4">
                                <h1 class="text-sm text-gray-700">{{ first?.user_id.name }}</h1>
                                <p class="text-sm text-gray-500">{{ first?.user_id.occupation }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- other posts -->
                <div class="mt-8 lg:w-1/4 lg:mt-0 lg:px-6 space-y-4 divide-y divide-dashed">
                    <div v-for="item in posts" :key="item.id">
                        <h3 class="text-blue-500 capitalize text-sm">{{ item.tags_id?.name }}</h3>

                        <NuxtLink :to="'/posts/' + item.slug" class="block font-medium text-gray-500 hover:underline hover:text-gray-700 mb-4 line-clamp-2">
                            {{ item.title }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    const isLoading = ref(true);
    const first = computed(() => {
        return usePost().recentPosts.value[0]
    });
    const posts = computed(() => {
        return usePost().recentPosts.value.slice(1);
    });

    onMounted(async() => {
        if (usePost().recentPosts.value.length > 0) {
            isLoading.value = false;
            return;
        }
        await usePost().getRecentPosts();
        isLoading.value = false;
    })

</script>