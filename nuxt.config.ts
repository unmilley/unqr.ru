const devServer = { https: true }
import { config } from './src/config.app'
import { fontLinks } from './src/fonts.app'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@nuxtjs/color-mode',
  ],
  tailwindcss: {
    cssPath: ['@/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: '@/tailwind.config.ts',
    viewer: false,
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    dataValue: 'theme',
    storageKey: 'theme',
    storage: 'cookie',
  },

  app: {
    head: {
      htmlAttrs: { dir: 'ltr', lang: 'ru' },
      titleTemplate: '%s %separator %siteName',
      link: [...fontLinks],
    },
  },

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
    customCollections: [{ prefix: 'unqr', dir: './assets/icons' }],
  },
  devServer,

  imports: {
    dirs: ['./shared/utils', './shared/types'],
  },
  nitro: {
    imports: {
      dirs: ['./shared/utils', './shared/types'],
    },
  },
})
