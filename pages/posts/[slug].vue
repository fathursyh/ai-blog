<template>
    <section class="bg-gray-50 text-gray-800 font-sans leading-relaxed mt-14">
        <div v-if="!isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-12">
            <!-- Main Article -->
            <main class="lg:flex-1">
                <article class="bg-white shadow rounded-lg p-6 min-h-[78.2vh]">
                    <img
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
                        alt="Blog Post Image"
                        class="rounded-lg w-full h-64 object-cover mb-6"
                    >
                    <header class="mb-4">
                        <h4 class="text-gray-500">{{ post?.tags_id.name }}</h4>
                        <h1 class="text-3xl font-extrabold mb-2 tracking-tight">
                            {{ post?.title }}
                        </h1>
                        <div class="flex flex-wrap items-center text-sm text-gray-500 mb-1">
                            <time datetime="2024-06-01" class="mr-4">{{ new Date(post?.created_at!).toLocaleDateString('en-EN', {dateStyle: 'medium'}) }}</time>
                            <span class="mr-4 flex items-center">
                                <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.663 0 5.095.87 7.121 2.338M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {{ post?.user_id.name }}
                            </span>
                            <span class="text-gray-400 italic">{{ post?.user_id.occupation }}</span>
                        </div>
                    </header>
                    <section class="prose prose-gray max-w-none">
                        {{ post?.body }}
                    </section>
                </article>
            </main>
            <!-- Aside Section -->
            <aside class="lg:w-80">
                <div class="bg-white shadow rounded-lg p-6 sticky top-6">
                    <h2 class="text-xl font-semibold mb-6 border-b border-gray-200 pb-2">More Posts</h2>
                    <ul class="space-y-6">
                        <li v-for="item in 6" :key="item">
                            <a href="#" class="text-lg font-medium text-gray-900 hover:text-indigo-600 transition">Responsive Layouts with Flexbox and Grid</a>
                            <div class="mt-1 flex flex-wrap">
                                <span class="tag">CSS</span>
                                <span class="tag">Responsive</span>
                            </div>
                        </li>

                    </ul>
                </div>
            </aside>
        </div>
    </section>
</template>

<script setup lang="ts">
    const slug = useRoute().params.slug;
    const post = computed(()=>{
        return usePost().postDetail.value;
    })
    const isLoading = ref(true);
    onBeforeMount(async() => {
        await usePost().getPostDetail(slug as string);
        isLoading.value = false;
    });
</script>