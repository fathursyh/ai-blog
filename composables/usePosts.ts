import type { PostInterface } from "~/shared/types/postInterface";

export const usePost = () => {
  const { $supabase } = useNuxtApp()
  const allPosts = useState<PostInterface[]>('posts', () => []);
  const recentPosts = useState<PostInterface[]>('recent', () => []);
  const pageCount = useState('page', () => 0);
  const postDetail = useState<PostInterface | null>('detail', () => null);

  const getPageCount = async(search = '') => {
    const { count, error } = await $supabase.from('posts').select('*', {count: 'estimated', head: true}).ilike('body', `%${search}%`);
    if (error) pageCount.value = 1;
    if (count! < 9) {
        pageCount.value = 1;
        return;
    } 
    pageCount.value = Math.ceil(count! / 9);
  } 

  const getAllPosts = async(page : number, search = '') => {
    getPageCount(search);
    const offset = (page - 1) * 9;
    const { data, error } = await $supabase.from('posts').select('*, tags_id (name), user_id (name, occupation)').ilike('title', `%${search}%`).order('created_at').range(offset, offset + 8);
    if (error) return;
    allPosts.value = data;
  };

  const getRecentPosts = async() => {
    const { data, error } = await $supabase.from('posts').select('*, tags_id (name), user_id (name, occupation)').limit(6);
    if (error) return;
    recentPosts.value = data;
  };

  const getPostDetail = async(slug: string) => {
    const { data, error } = await $supabase.from('posts').select('*, tags_id (name), user_id (name, occupation)').eq('slug', slug).single();
    if (error) throw showError({statusCode: 404, message: 'Post not found.'});
    postDetail.value = data;
  };

  return {
    pageCount,
    allPosts,
    recentPosts,
    postDetail,
    getAllPosts,
    getRecentPosts,
    getPostDetail,
  }
}