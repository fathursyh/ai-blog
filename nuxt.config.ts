import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  components: true,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon', '@nuxt/eslint', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Poppins: true
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
})