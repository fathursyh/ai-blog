export const useAuthor = () => {
    const { $supabase } = useNuxtApp();
    const getAuthorData = async() => {
        const user = (await $supabase.from('author').select().eq('id', useAuth().user.value?.id).single()).data;
        sessionStorage.setItem('user', JSON.stringify(user));
    };

    const changeName = async(name: string) => {
        const { error } = await $supabase.from("author").update({ fullName: name }).eq("id", useAuth().user.value?.id);
        if (error) return false;
        return true;
    };

    const changeJob = async(occupation: string) => {
        const { error } = await $supabase.from("author").update({ occupation: occupation }).eq("id", useAuth().user.value?.id);
        if (error) return false;
        return true;
    }

    return {
        getAuthorData,
        changeName,
        changeJob,
    };
};
