<template>
  <div class="min-h-screen w-fullbg-gray-100 p-12">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-800">Your Dashboard</h1>
      <p class="text-gray-500">Welcome back! Here's a quick overview of your blog activity.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white p-4 rounded shadow">
        <p class="text-sm text-gray-500">Published Posts</p>
        <h2 class="text-2xl font-bold text-gray-800">24</h2>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <p class="text-sm text-gray-500">Drafts</p>
        <h2 class="text-2xl font-bold text-gray-800">5</h2>
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
    <div class="bg-white p-6 rounded shadow">
      <h3 class="text-lg font-semibold text-gray-700 mb-4">Recent Posts</h3>
      <ul class="divide-y divide-gray-200">
        <li v-for="(post, index) in recentPosts" :key="index" class="py-3">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-800 font-medium">{{ post.title }}</p>
              <p class="text-sm text-gray-500">Published on {{ post.date }}</p>
            </div>
            <p class="text-sm text-gray-500">{{ post.views }} views</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
   definePageMeta({
        layout: 'dashboard-layout',
        pageTransition: {css: true, mode: 'out-in', name: 'fade'},
    });

    const recentPosts = [
    { title: 'Understanding Async/Await in Vue', date: 'May 8, 2025', views: 320 },
    { title: 'My Blogging Workflow', date: 'May 2, 2025', views: 198 },
    { title: 'Why I Switched to Nuxt 3', date: 'Apr 25, 2025', views: 450 }
    ]
</script>

<style scoped>
/* Add any custom styles here */
</style>
