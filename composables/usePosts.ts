import type { PostInterface } from "~/shared/types/postInterface";

export const usePost = () => {
  const { $supabase } = useNuxtApp()
  const allPosts = useState<PostInterface[]>('posts', () => []);
  const pageCount = useState('page', () => 0);

  const getPageCount = async() => {
    const { count, error } = await $supabase.from('posts').select('*', {count: 'estimated', head: true});
    if (error) pageCount.value = 1;
    pageCount.value = Math.ceil(count! / 9);
  } 

  const getAllPosts = async(page : number) => {
        const offset = (page - 1) * 9;
        const { data, error } = await $supabase.from('posts').select('*, tags_id (name), user_id (name, occupation)').order('created_at').range(offset, offset + 8);
        if (error) throw error;
        allPosts.value = data;
  };

  return {
    pageCount,
    allPosts,
    getPageCount,
    getAllPosts,
  }
}