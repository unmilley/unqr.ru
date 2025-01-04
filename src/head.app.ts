import type { NuxtAppConfig } from 'nuxt/schema'

const fontLinks = [
  'https://fonts.googleapis.com/css2?family=Nunito:wght@200..1000&display=swap',
  'https://fonts.googleapis.com/css2?family=Tiny5&text=UNQR-unqr&display=swap',
]

export const head: NuxtAppConfig['head'] = {
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ...fontLinks.map((href) => ({ rel: 'stylesheet', href })),
  ],
}
