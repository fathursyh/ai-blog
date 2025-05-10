import type { PostInterface } from "~/shared/types/postInterface";

export const usePost = () => {
  const { $supabase } = useNuxtApp()
  const allPosts = useState<PostInterface[]>('posts', () => []);

  const getAllPosts = async(page : number) => {
        console.log(page)
        const { data, error } = await $supabase.from('posts').select('*, tags_id (name), user_id (name, occupation)').range(0, 9);
        if (error) throw error;
        allPosts.value = data;
  };

  return {
    allPosts,
    getAllPosts,
  }
}