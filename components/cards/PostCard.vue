<template>
     <div class="p-8 bg-white border border-gray-300 rounded shadow-sm w-full">
          <p class="mb-2 text-xs font-semibold tracking-wide uppercase">
            <NuxtLink :to="'/posts/' + slug" class="transition-colors duration-200 text-gray-500 hover:underline hover:text-blue-500" aria-label="Category" :title="tags_id?.name">{{ tags_id?.name }}</NuxtLink>
            <span class="text-gray-600"> — {{ new Date(created_at).toLocaleDateString('en-EN', {dateStyle: 'medium'}) }}</span>
          </p>
          <NuxtLink :to="'/posts/' + slug" aria-label="Article" :title="title" class="line-clamp-2 mb-2 text-xl font-bold leading-6 text-black transition-colors duration-200 hover:text-blue-500">{{ title }}</NuxtLink>
          <p class="mb-4 text-gray-700 line-clamp-1">
            {{ body }}
          </p>
          <div class="flex items-center">
            <NuxtLink :to="'/posts/' + slug" aria-label="Author" title="Author" class="mr-3">
              <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" alt="avatar" class="object-cover w-10 h-10 rounded-full shadow-sm" >
            </NuxtLink>
            <div>
              <NuxtLink :to="'/posts/' + slug" aria-label="Author" title="Author" class="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400">{{ user_id?.name }}</NuxtLink>
              <p class="text-sm font-medium leading-4 text-gray-600">{{ user_id?.occupation }}</p>
            </div>
          </div>
        </div>
</template>

<script setup lang="ts">
  import type { PostInterface } from '~/shared/types/postInterface';

  defineProps<PostInterface>()

</script>