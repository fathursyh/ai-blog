<template>
    <div class="m-4 flex gap-2 justify-center sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-8 md:px-24 px-4 mx-auto">
        <input id="search-bar" v-model="search" class="border border-gray-300 rounded px-4 py-2 w-62" type="search" name="search" aria-label="search bar" placeholder="search posts" >
        <UIButton class="w-full md:w-32" variant="primary" @click="searchHandler">Search</UIButton>
    </div>
</template>

<script setup lang="ts">
    const search = ref('');
    const searchHandler = async() => {
        await navigateTo({path: '/posts', query: {page: "1", search: search.value}})
    }
</script>