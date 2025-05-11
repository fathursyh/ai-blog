import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  components: true,
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },
  ssr: true,
  app: {
    head: {
      title: "InkCraft",
      meta: [
        {property: 'og:title', content: 'Craft your thought to high quality post with AI.'},
        {name: 'description', content: 'Craft your thought to high quality post with AI.'},
        {property: 'og:description', content: 'Craft your thought to high quality post with AI.'},
        {name: 'keywords', content: 'blog'},
      ],
      htmlAttrs: {
        lang: 'en',
      }
    }
  },
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon', '@nuxt/eslint', '@nuxtjs/google-fonts', '@nuxt/image'],
  googleFonts: {
    families: {
      Oswald: true,
      Poppins: true
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  routeRules: {
    '/login' : { prerender: true, appMiddleware: 'before-page' },
    '/posts': { swr: true },
    '/dashboard/**': { ssr: false, appMiddleware: 'before-page' },
    '/api/**': { cors: true, },
  },
})