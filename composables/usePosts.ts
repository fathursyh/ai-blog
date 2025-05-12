import type { PostInterface } from "~/shared/types/postInterface";

export const usePost = () => {
    const { $supabase } = useNuxtApp();
    const defaultEmpty = {
        title: "",
        slug: "",
        tags_id: 1,
        body: "",
    };
    const newPost = useState<{ title: string; slug: string; tags_id: number; body: string }>("newPost", () => ({
        title: "",
        slug: "",
        tags_id: 1,
        body: "",
    }));

    const clearInput = () => {
        newPost.value = defaultEmpty;
        image.value = undefined;
    };
    const image = useState<File | undefined>("imageHeader", () => undefined);
    const allPosts = useState<PostInterface[]>("posts", () => []);
    const recentPosts = useState<PostInterface[]>("recent", () => []);
    const pageCount = useState("page", () => 0);
    const postDetail = useState<PostInterface | null>("detail", () => null);

    // fetching section
    const getPageCount = async (search = "") => {
        const { count, error } = await $supabase.from("posts").select("*", { count: "estimated", head: true }).ilike("body", `%${search}%`);
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
            .select("*, tags_id (name), user_id (name, occupation)")
            .ilike("title", `%${search}%`)
            .order("created_at", { ascending: false })
            .range(offset, offset + 8);
        if (error) return;
        allPosts.value = data;
    };

    const getRecentPosts = async () => {
        const { data, error } = await $supabase.from("posts").select("*, tags_id (name), user_id (name, occupation)").order("created_at", { ascending: false }).limit(6);
        if (error) return;
        recentPosts.value = data;
    };

    const getPostDetail = async (slug: string) => {
        const { data, error } = await $supabase.from("posts").select("*, tags_id (name), user_id (name, occupation)").eq("slug", slug).single();
        if (error) throw showError({ statusCode: 404, message: "Post not found." });
        data.image_url = $supabase.storage.from("header-image").getPublicUrl(data.image_url).data.publicUrl;
        postDetail.value = data;
    };

    // create new post
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

            const { error } = await $supabase.from("posts").insert({
                ...newPost.value,
                image_url: imageUrl,
                user_id: useAuth().user.value?.id,
            });
            if (error) throw error;
            // ? clear input
            clearInput();
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    // dashboard
    const getUserRecentPost = async () => {
        const user = JSON.parse(localStorage.getItem("sb-supabase")!)?.user;
        const { data, error } = await $supabase.from("posts").select().eq("user_id", user.id).order("created_at", { ascending: false }).limit(3);
        if (error) return [];
        return data;
    };
    const publishPost = async (id : string, isPublished: boolean) => {
        const { error } = await $supabase.from("posts").update({ published: !isPublished }).eq("id", id);
        if (error) {
            alert(error);
            return;
        }
        showAlert();
    };

    return {
        newPost,
        clearInput,
        image,
        pageCount,
        allPosts,
        recentPosts,
        postDetail,
        getAllPosts,
        getRecentPosts,
        getPostDetail,
        createNewPost,
        getUserRecentPost,
        publishPost,
    };
};
