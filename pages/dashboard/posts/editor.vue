<template>
    <section class="p-12">
        <h1 class="text-left font-bold text-2xl pb-2 mb-6 border-b border-dashed">Create a new post</h1>
        <div class="max-w-screen-xl flex gap-4 justify-between">
            <form @submit.prevent="postHandler">
                <div class="mb-2">
                    <label for="title" class="block text-sm">Title</label>
                    <input
                        id="title"
                        v-model="usePost().newPost.value.title"
                        type="text"
                        class="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-lg border-gray-600 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Living in 2025"
                        required
                    >
                </div>
                <div class="mb-2">
                    <label for="tags" class="block text-sm">Select Tags</label>
                    <select
                        id="tags"
                        v-model="usePost().newPost.value.tags_id"
                        name="tags"
                        class="block w-full px-3 py-2 mt-1 text-sm border rounded-lg text-gray-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 border-gray-600 focus:border-blue-300 bg-white"
                        required
                    >
                        <option v-for="(item, i) in tags" :key="item" :value="i + 1">{{ item }}</option>
                    </select>
                </div>
                <div class="mb-2">
                    <label for="image" class="block text-sm">Header Image</label>
                    <input
                        id="image"
                        accept="image/*"
                        type="file"
                        class="block w-full px-3 py-2 mt-1 text-sm border rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 border-gray-600 focus:border-blue-300"
                        @change="previewImage"
                    >
                </div>
                <UIButton class="w-full mt-2 shadow">Post</UIButton>
                <div v-if="imageUrl" class="mt-4 w-full overflow-hidden">
                    <img :src="imageUrl" alt="Preview" class="w-full h-52 object-contain rounded shadow-md border border-gray-700">
                </div>
            </form>
            <UITextEditor />
        </div>
    </section>
</template>

<script setup lang="ts">
    import { tags } from "~/shared/data";
    definePageMeta({
        layout: "dashboard-layout",
        pageTransition: { css: true, mode: "out-in", name: "fade" },
    });

    const imageUrl = ref();

    function previewImage(event: Event) {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        usePost().image.value = file;
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
            imageUrl.value = e.target?.result;
            };
            reader.readAsDataURL(file);
        } else {
            imageUrl.value = null;
        }
    }

    const postHandler = async() => {
        const result = await usePost().createNewPost();
        if (!result) {
            alert('something is wrong!');
            return;
        };
        showAlert();
        return navigateTo('/dashboard');
    }
</script>
