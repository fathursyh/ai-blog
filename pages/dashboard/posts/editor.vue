<template>
    <section class="p-12">
        <h1 class="text-left font-bold text-2xl pb-2 mb-6 border-b border-dashed">Create a new post</h1>
        <div class="max-w-screen-xl flex gap-4 justify-between">
            <form @submit.prevent="postHandler" @change="isDirty = true">
                <div class="mb-2">
                    <label for="title" class="block text-sm">Title</label>
                    <input
                        id="title"
                        v-model="usePost().newPost.value.title"
                        type="text"
                        class="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-lg border-gray-600 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Living in 2025"
                        required
                        @change="slugTitle"
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
                <div v-if="imageUrl" class="mt-4 w-full overflow-hidden cursor-pointer relative group">
                    <div class="absolute w-full h-full bg-black/70 hidden place-items-center group-hover:grid">
                        <UIButton variant="secondary" @click="clearImage">Remove</UIButton>
                    </div>
                    <img :src="imageUrl" alt="Preview" class="w-full h-52 object-contain rounded shadow-md border border-gray-700">
                </div>
            </form>
            <UITextEditor @change="isDirty = true" />
        </div>
    </section>
</template>

<script setup lang="ts">
    import slugify from "slugify";
    import { tags } from "~/shared/data";
    definePageMeta({
        layout: "dashboard-layout",
        pageTransition: { css: true, mode: "out-in", name: "fade" },
    });

    const imageUrl = ref();
    const isDirty = ref(false);

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
    function clearImage() {
        const file = document.getElementById('image')!;
        (file as HTMLInputElement).value = '';
        imageUrl.value = '';
        usePost().image.value = undefined;
    }

    const slugTitle = () => {
       usePost().newPost.value.slug = slugify(usePost().newPost.value.title, {lower: true}) + '-' + new Date().getMilliseconds();
    }

    const postHandler = async() => {
        const result = await usePost().createNewPost();
        if (!result) {
            alert('something is wrong!');
            return;
        };
        isDirty.value = false;
        showAlert(200, 'Post succesfully created!');
        return window.location.assign('/dashboard');
    }


    const beforeUnloadHandler = (event: Event) => {
        if (isDirty.value) {
            event.preventDefault();
            return "";
        }
    };

    const router = useRouter();
    router.beforeEach((to, from, next) => {
        if (from.name === 'dashboard-posts-editor') {
            if (isDirty.value === true) {
                const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?')
                if (!confirmLeave) return next(false);
                usePost().clearInput();
            }
        }
        isDirty.value = false;
        next();
    });
    
    onBeforeMount(() => {
        window.addEventListener("beforeunload", beforeUnloadHandler);
    });

    onMounted(async() => {
        if(useRoute().query.edit) {
            isDirty.value = true;
            await usePost().getPostDetail(useRoute().query.edit as string);
            usePost().newPost.value.id = usePost().postDetail.value!.id;
            usePost().newPost.value.title = usePost().postDetail.value!.title;
            usePost().newPost.value.slug = usePost().postDetail.value!.slug;
            usePost().newPost.value.tags_id = usePost().postDetail.value!.tags_id.id;
            usePost().newPost.value.body = usePost().postDetail.value!.body!;
            if (usePost().postDetail.value?.image_url.length === 83) return;
            imageUrl.value = usePost().postDetail.value?.image_url;
        }
    });

    onBeforeUnmount(() => {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
        usePost().clearInput();
    });

</script>
