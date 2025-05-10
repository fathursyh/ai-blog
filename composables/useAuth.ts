import type { User } from "@supabase/supabase-js"

export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const user = useState<User | null>('user', () => null)

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
    })
    if (error) throw error;
    user.value = data.user
    return data
  }

  // Login
  const login = async (email: string, password: string) => {
    const { data, error } = await $supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    user.value = data.user
    return data
  }

  // Logout
  const logout = async () => {
    const { error } = await $supabase.auth.signOut()
    if (error) throw error
    user.value = null
  }

  return {
    user,
    register,
    login,
    logout
  }
}
