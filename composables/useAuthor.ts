export const useAuthor = () => {
    const { $supabase } = useNuxtApp();
    const getAuthorData = async() => {
        return (await $supabase.from('author').select().eq('id', useAuth().user.value?.id).single()).data;
    };

    const changeName = async(name: string) => {
        const { error } = await $supabase.from("author").update({ fullName: name }).eq("id", useAuth().user.value?.id);
        if (error) return false;
        return true;
    };

    return {
        getAuthorData,
        changeName,
    };
};
