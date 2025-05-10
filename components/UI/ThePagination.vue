<template>
<div class="flex">
   <button class="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 disabled:bg-gray-400 disabled:hover:bg-gray-400" :class="[page < 2 ? 'cursor-not-allowed' : 'cursor-pointer']" :disabled="page < 2" @click="prevPage">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
    </button>

    <button v-for="count in navigationButtons" :key="count" class="hidden cursor-pointer min-w-12 px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200" :class="{'bg-green-700!': count === page}" @click="gotoPage(count)">
        {{ count }}
    </button>

    <button class="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 disabled:bg-gray-400 disabled:hover:bg-gray-400" :class="[page === pageCount ? 'cursor-not-allowed' : 'cursor-pointer']" :disabled="page === pageCount"  @click="nextPage">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
    </button>
</div>
</template>

<script setup lang="ts">
    const route = useRoute();
    const page = computed(() => Number(route.query.page));
    const pageCount = computed(() => {
        return usePost().pageCount.value;
    });
    const navigationButtons = computed(() => {
        if (pageCount.value < 5) return pageCount.value;
        return [
            pageCount.value - 4,
            pageCount.value - 3,
            pageCount.value - 1,
            pageCount.value,
        ] 
    });
    const prevPage = async() => {
        if (page.value < 2) return;
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        await navigateTo({path: '/posts', query: {page: page.value - 1, search: useRoute().query.search}});
    }
    const nextPage = async() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        await navigateTo({path: '/posts', query: {page: page.value + 1, search: useRoute().query.search}});
    }
    const gotoPage = async(count : number) => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        await navigateTo({path: '/posts', query: {page: count, search: useRoute().query.search}});
    }
</script>