import type { PostInterface } from "~/shared/types/postInterface";

export const usePost = () => {
    const { $supabase } = useNuxtApp();
    const defaultEmpty = {
        id: undefined,
        title: "",
        slug: "",
        tags_id: 1,
        body: "",
    };
    const newPost = useState<{ id: string | undefined; title: string; slug: string; tags_id: number; body: string }>("newPost", () => ({
        id: undefined,
        title: "",
        slug: "",
        tags_id: 1,
        body: "",
    }));
    const image = useState<File | undefined>("imageHeader", () => undefined);

    const clearInput = () => {
        newPost.value = defaultEmpty;
        image.value = undefined;
    };
    const allPosts = useState<PostInterface[]>("posts", () => []);
    const recentPosts = useState<PostInterface[]>("recent", () => []);
    const pageCount = useState("page", () => 0);
    const postDetail = useState<PostInterface | null>("detail", () => null);
    const userPosts = useState<PostInterface[]>("user-posts", () => []);

    // fetching section
    const getPageCount = async (search = "", id = '') => {
        const { count, error } = id === '' ?
        await $supabase.from("posts").select("*", { count: "estimated", head: true }).ilike("body", `%${search}%`):
        await $supabase.from("posts").select("*", { count: "estimated", head: true }).ilike("body", `%${search}%`).eq('user_id', id);
        if (error) pageCount.value = 1;
        if (count! < 9) {
            pageCount.value = 1;
            return;
        }
        pageCount.value = Math.ceil(count! / 9);
    };

    const getAllPosts = async (page: number, search = "") => {
        getPageCount(search);
        const offset = (page - 1) * 9;
        const { data, error } = await $supabase
            .from("posts")
            .select("*, tags_id (name), user_id (name, occupation)").
            eq('published', true)
            .ilike("title", `%${search}%`)
            .order("created_at", { ascending: false })
            .range(offset, offset + 8);
        if (error) return;
        allPosts.value = data;
    };

    const getRecentPosts = async () => {
        const { data, error } = await $supabase.from("posts").select("*, tags_id (id, name), user_id (name, occupation)").eq('published', true).order("created_at", { ascending: false }).limit(6);
        if (error) return;
        recentPosts.value = data;
    };

    const getPostDetail = async (slug: string) => {
        const { data, error } = await $supabase.from("posts").select("*, tags_id (id, name), user_id (name, occupation)").eq("slug", slug).eq('published', true).single();
        if (error) throw showError({ statusCode: 404, message: "Post not found." });
        data.image_url = $supabase.storage.from("header-image").getPublicUrl(data.image_url).data.publicUrl;
        postDetail.value = data;
    };

    // create and edit post
    const createNewPost = async () => {
        try {
            let imageUrl: string | undefined;
            if (image.value !== undefined) {
                const { data, error } = await $supabase.storage
                    .from("header-image") // your bucket name
                    .upload(`uploads/${Date.now()}_${image.value.name}`, image.value);
                if (error) throw error;
                imageUrl = data?.path;
            }
            // ? edit also here
            const { error } = await $supabase.from("posts").upsert(
                {
                    ...newPost.value,
                    image_url: imageUrl,
                    user_id: useAuth().user.value?.id,
                },
                { ignoreDuplicates: false, onConflict: "id" }
            );
            if (error) throw error;
            // ? clear input
            clearInput();
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    // delete post
    const deletePost = async (id: string, imageURL: string) => {
        const {error} = await $supabase.from("posts").delete().eq("id", id);
        if (error) return false;
        await $supabase.storage.from("header-image").remove([`${imageURL}`]);
        return true;
    };

    // dashboard
    const getUserRecentPost = async () => {
        const user = JSON.parse(localStorage.getItem("sb-supabase")!)?.user;
        const { data, error } = await $supabase.from("posts").select().eq("user_id", user.id).order("created_at", { ascending: false }).limit(3);
        if (error) return [];
        return data;
    };
    const publishPost = async (id: string, isPublished: boolean) => {
        const { error } = await $supabase.from("posts").update({ published: !isPublished }).eq("id", id);
        if (error) {
            showAlert(400, "Something's wrong!");
            return;
        }
        showAlert(200, 'Post has been published!');
    };
    const getPostsStatistics = async () => {
        // TODO: total views statistic
        const user = JSON.parse(localStorage.getItem("sb-supabase")!)?.user;
        return Promise.all([
            await $supabase.from('posts').select("*", { count: "estimated", head: true }).eq('published', true).eq('user_id', user.id),
            await $supabase.from('posts').select("*", { count: "estimated", head: true }).eq('published', false).eq('user_id', user.id),
        ]).then((data) => {
            return data;
        }).catch(error => error);
    }
    
    // fetch user posts
    const getAllUserPosts = async (page: number, search = "") => {
        const user = JSON.parse(localStorage.getItem("sb-supabase")!)?.user;
        getPageCount(search, user.id);
        const offset = (page - 1) * 10;
        const { data, error } = await $supabase
            .from("posts")
            .select("*, tags_id (name)").eq('user_id', user.id)
            .ilike("title", `%${search}%`)
            .order("created_at", { ascending: false })
            .range(offset, offset + 9);
        if (error) return;
        allPosts.value = data;
    };

    return {
        newPost,
        clearInput,
        image,
        pageCount,
        allPosts,
        recentPosts,
        postDetail,
        userPosts,
        getAllPosts,
        getRecentPosts,
        getPostDetail,
        createNewPost,
        deletePost,
        getUserRecentPost,
        getPostsStatistics,
        publishPost,
        getAllUserPosts,
    };
};
