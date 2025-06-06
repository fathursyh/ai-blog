import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const supabase: SupabaseClient = createClient(config.public.supabaseUrl as string, config.public.supabaseKey as string, {
        auth: {
            storageKey: 'sb-supabase'
        }
    });
  
    nuxtApp.provide("supabase", supabase);
    useAuth().getUserFromSession();
});
