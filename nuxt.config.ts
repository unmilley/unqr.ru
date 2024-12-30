import { devServer } from './.temp/dev'
import { config } from './src/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss'],
  tailwindcss: { viewer: false },

  runtimeConfig: { ...config },

  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
    },
  },

  devServer,
})
