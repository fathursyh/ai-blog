import type { User } from "@supabase/supabase-js"

export const useAuth = () => {
  const { $supabase } = useNuxtApp();
  const user = useState<User | null >('user', () => null);
 
  // Register
  const register = async (email: string, fullName: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) throw new Error('Password and confirm password are not match.', {cause: 'confirmPassword'});
    const { data, error } = await $supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
            fullName: fullName
        }
      }
    });
    if (error) throw error;
    user.value = data.user
    logoutTimer(data.session!.expires_in * 1000);
    return data;
  };

  // Login
  const login = async (email: string, password: string) => {
    const { data, error } = await $supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error
    user.value = data.user;
    logoutTimer(data.session.expires_in * 1000);
    return data;
  };

  // Logout
  const logout = async () => {
    const { error } = await $supabase.auth.signOut()
    if (error) throw error
    user.value = null;
  };

  // timed logout 1 hour (3600)
  const logoutTimer = (expires_in: number) => {
    const timer = setTimeout(async() => {
      await logout();
      await navigateTo({path: '/'});
      clearTimeout(timer);
    }, expires_in);
  };

  // persist login from localStorage
  const getUserFromSession = async() => {
    const persistedUser = await JSON.parse(localStorage.getItem('sb-supabase')!);
    if (persistedUser === null) {
      logout();
      return;
    };
    if (isSessionExpired(persistedUser.expires_at!)) {
      logout();
      return;
    };
    const {data} = await $supabase.auth.setSession({access_token: persistedUser.access_token, refresh_token: persistedUser.refresh_token});
    user.value = data.user;
    logoutTimer(data.session!.expires_in * 1000);
  };
  return {
    user,
    register,
    login,
    logout,
    getUserFromSession
  };
};
