const devServer = { https: true }
import { config } from './src/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase'],

  runtimeConfig: { ...config },

  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
    },
  },

  devServer,
})
