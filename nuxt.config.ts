const devServer = { https: true }
import { config } from './src/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@nuxt/icon', '@vueuse/nuxt', '@nuxtjs/seo'],
  tailwindcss: { viewer: false },

  runtimeConfig: { ...config },

  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
    },
  },
  icon: {
    collections: ['bx'],
    mode: 'svg',
  },
  devServer,
})
