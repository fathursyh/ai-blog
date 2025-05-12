<template>
    <div class="bg-white p-6 rounded shadow">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Recent Posts</h3>
        <ul v-if="posts?.length! > 0" class="divide-y divide-gray-200">
            <li v-for="(post) in posts" :key="post.id" class="py-3">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-gray-800 font-medium">{{ post.title }}</p>
                        <p class="text-sm text-gray-500">Published on {{ new Date(post?.created_at).toLocaleDateString('en-EN', {dateStyle: 'medium'}) }}</p>
                    </div>
                    <UIDropdownMenu :published="post.published" @on-publish="handlePublish(post.id, post.published)"   />
                </div>
            </li>
        </ul>
        <p v-else class="text-center">No recent posts.</p>
    </div>
</template>

<script setup lang="ts">
    import type { PostInterface } from '~/shared/types/postInterface';
    const posts = ref<PostInterface[]>([]);

    const handlePublish = async(id: string, isPublished: boolean) => {
        const windowConfirm = confirm('Publish this post?');
        if (!windowConfirm) return;
        await usePost().publishPost(id, isPublished);
        posts.value = await usePost().getUserRecentPost();
    }
    onMounted(async() => {
        posts.value = await usePost().getUserRecentPost();
        sessionStorage.setItem('recent-posts', JSON.stringify(posts.value));
    })

</script>