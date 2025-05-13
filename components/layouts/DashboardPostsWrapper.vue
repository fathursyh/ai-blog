<template>
            <div class="max-w-7xl mx-auto">
                
            <div v-if="isLoading" class="min-w-full h-[50vh] bg-white grid grid-rows-10 gap-2 animate-pulse">
                <span v-for="item in 10" :key="item" class="bg-gray-300" />
            </div>
            <div v-if="!isLoading && posts.length > 0" class="overflow-x-auto shadow">
                <table class="min-w-full bg-white border border-gray-200 rounded shadow-sm">
                    <thead class="bg-gray-500 text-gray-50 text-sm uppercase text-left">
                        <tr>
                            <th class="px-4 py-3 border-b border-gray-300">No</th>
                            <th class="px-4 py-3 border-b border-gray-300">Title</th>
                            <th class="px-4 py-3 border-b border-gray-300">Created At</th>
                            <th class="px-4 py-3 border-b border-gray-300">Updated At</th>
                            <th class="px-4 py-3 border-b border-gray-300">Tags</th>
                            <th class="px-4 py-3 border-b border-gray-300">Status</th>
                            <th class="px-4 py-3 border-b border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700 text-sm">
                        <tr v-for="(post, index) in posts" :key="post.id" class="hover:bg-gray-50">
                            <td class="px-4 py-3 border-b border-gray-300">{{ (index + 1) + 10 * (page - 1) }}</td>
                            <td class="px-4 py-3 border-b border-gray-300">{{ post.title }}</td>
                            <td class="px-4 py-3 border-b border-gray-300">{{ new Date(post.created_at).toLocaleDateString('en-EN', {dateStyle: 'short'}) }}</td>
                            <td class="px-4 py-3 border-b border-gray-300">{{ new Date(post.updated_at).toLocaleDateString('en-EN', {dateStyle: 'short'}) }}</td>
                            <td class="px-4 py-3 border-b border-gray-300">{{ post.tags_id.name }}</td>
                            <td class="px-4 py-3 border-b border-gray-300">
                                <span class="inline-block px-2 py-1 text-xs font-medium rounded" :class="[post.published ? 'text-green-700 bg-green-100' : 'text-gray-700 bg-gray-100']">{{ post.published ? 'Published' : 'Draft' }}</span>
                            </td>
                            <td class="px-4 py-3 border-b border-gray-300 flex gap-2">
                                 <UIButton class="w-10 h-10 bg-green-500!" @click="handlePublish(post.id, post.published)">
                                    <Icon name="lucide:file-chart-column-increasing" class="text-lg" />
                                 </UIButton>
                                 <UIButton class="w-10 h-10" @click="navigateTo({path: '/dashboard/posts/editor', query: {edit: post.slug}})">
                                    <Icon name="lucide:pencil-line" class="text-lg" />
                                 </UIButton>
                                 <UIButton class="w-10 h-10 bg-red-600!" @click="deletePost(post.id, post.image_url)">
                                    <Icon name="lucide:trash" class="text-lg" />
                                 </UIButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
</template>

<script setup lang="ts">

  const isLoading = ref(true);
  const page = computed(() => Number(useRoute().query.page));
  const search = computed(() => useRoute().query.search?.toString());
  const posts = computed(() => {
    return usePost().allPosts.value;
  })
  onMounted(() => {
    usePost().getAllUserPosts(page.value).then(()=> {isLoading.value = false});
  });
  
  watch([page, search], () => {
    isLoading.value = true;
    usePost().getAllUserPosts(page.value, search.value).then(()=> {isLoading.value = false});
  });

  const handlePublish = async(id: string, isPublished: boolean) => {
        const windowConfirm = confirm(isPublished ? 'Draft this post?' : 'Publish this post?');
        if (!windowConfirm) return;
        await usePost().publishPost(id, isPublished);
        usePost().getAllUserPosts(page.value).then(()=> {isLoading.value = false});
    }
    const deletePost = async(id: string, url: string) => {
        const windowConfirm = confirm('Delete this post?');
        if (!windowConfirm) return;
        const res = await usePost().deletePost(id, url);
        if (!res) {
            alert("Something is wrong!");
            return;
        }
        usePost().getAllUserPosts(page.value).then(()=> {isLoading.value = false});
    }
</script>