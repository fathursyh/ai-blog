<template>
    <NuxtLink to="/dashboard/posts/editor"  class="w-16 h-16 shadow-lg z-40 bg-blue-500 rounded-full fixed bottom-[30px] right-[30px] cursor-pointer hover:scale-105 grid place-items-center border-2 border-gray-50" :class="[useRoute().name === 'dashboard-posts' && 'left-[30px] md:left-auto']" title="Create a new post">
        <Icon name="lucide:pencil" class="text-2xl text-white" />
    </NuxtLink>
</template>