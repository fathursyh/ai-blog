<template>
    <div class="px-4 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div v-if="isLoading" class="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto md:max-w-full" >
          <div v-for="item in 9" :key="item" class="min-w-52 min-h-56 rounded bg-gray-200 animate-pulse" />
      </div>
      <div v-else class="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto md:max-w-full">
          <CardsPostCard v-for="item in posts.value" :key="item.id" v-bind="item" />
      </div>
    </div>
</template>

<script setup lang="ts">
  const isLoading = ref(true);
  const page = computed(() => Number(useRoute().query.page));
  const posts = computed(() => {
    return usePost().allPosts;
  })
  onMounted(() => {
    usePost().getAllPosts(page.value).then(()=> {isLoading.value = false});
  });
  watch(page, () => {
    isLoading.value = true;
    usePost().getAllPosts(page.value).then(()=> {isLoading.value = false});
  })

</script>