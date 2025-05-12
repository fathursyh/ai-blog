<template>
    <div class="bg-white p-6 rounded shadow">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Recent Posts</h3>
        <ul v-if="posts?.length! > 0" class="divide-y divide-gray-200">
            <li v-for="(post) in posts" :key="post.id" class="py-3">
                <div class="flex justify-between items-center">
                    <div>
                        <NuxtLink :to="`/posts/${post.slug}`" class="text-gray-800 font-medium hover:text-blue-500">{{ post.title }}</NuxtLink>
                        <p class="text-sm text-gray-500">Published on {{ new Date(post?.created_at).toLocaleDateString('en-EN', {dateStyle: 'medium'}) }}</p>
                    </div>
                    <div class="flex gap-4 items-center">
                        <span class="text-sm" :class="[post.published ? 'text-green-600' : 'text-gray-400']">{{ post.published ? 'Published' : 'Draft' }}</span>
                        <UIDropdownMenu :published="post.published" @on-publish="handlePublish(post.id, post.published)" @on-edit="navigateTo({path: '/dashboard/posts/editor', query: {edit: post.slug}})" @on-delete="deletePost(post.id, post.image_url)"  />
                    </div>
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
        const windowConfirm = confirm(isPublished ? 'Draft this post?' : 'Publish this post?');
        if (!windowConfirm) return;
        await usePost().publishPost(id, isPublished);
        posts.value = await usePost().getUserRecentPost();
    }
    const deletePost = async(id: string, url: string) => {
        const windowConfirm = confirm('Delete this post?');
        if (!windowConfirm) return;
        const res = await usePost().deletePost(id, url);
        if (!res) {
            alert("Something is wrong!");
            return;
        }
        posts.value = await usePost().getUserRecentPost();
    }
    onMounted(async() => {
        posts.value = await usePost().getUserRecentPost();
        sessionStorage.setItem('recent-posts', JSON.stringify(posts.value));
    })

</script>