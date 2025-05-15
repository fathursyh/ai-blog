<template>
  <div class="min-h-screen w-full 2xl:max-w-screen-xl mx-auto p-4 pt-14 lg:p-12 pb-24">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-800">Your Dashboard</h1>
      <p class="text-gray-500">Welcome back! Here's a quick overview of your blog activity.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white p-4 rounded shadow">
        <p class="text-sm text-gray-500">Published Posts</p>
        <h2 class="text-2xl font-bold text-gray-800">{{ stats[0]?.count }}</h2>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <p class="text-sm text-gray-500">Drafts</p>
        <h2 class="text-2xl font-bold text-gray-800">{{ stats[1]?.count }}</h2>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <p class="text-sm text-gray-500">Total Views</p>
        <h2 class="text-2xl font-bold text-gray-800">12,430</h2>
      </div>
    </div>

    <!-- Chart Placeholder -->
    <div class="bg-white p-6 rounded shadow mb-6">
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Posts Analytics</h3>
      <div class="h-64 bg-gray-200 rounded flex items-center justify-center text-gray-500">
        Chart Placeholder (e.g., Views Over Time)
      </div>
    </div>

    <!-- Recent Posts -->
    <DashboardRecentPosts @update="getStatistics" />
  </div>
</template>

<script setup lang="ts">
   definePageMeta({
        layout: 'dashboard-layout',
        pageTransition: {css: true, mode: 'out-in', name: 'fade'},
    });

    const stats = ref<{count: number}[]>([]);
    async function getStatistics() {
      stats.value = await usePost().getPostsStatistics();
    }
    onMounted(() => {
      getStatistics();
    })


</script>