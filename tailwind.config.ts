import { defineTheme, type Variables } from '@unmilley/daisyui'
import { masterClass } from '@unmilley/tw-master-class'
import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

const VARIABLES: Variables = {
  roundedBox: '1rem',
  roundedBtn: '0.5rem',
  roundedBadge: '1.9rem',
  animationBtn: '0.25s',
  animationInput: '.2s',
  btnFocusScale: '0.95',
  borderBtn: '1px',
  tabBorder: '1px',
  tabRadius: '0.5rem',
}

const light = defineTheme({
  extends: 'cupcake',
  colors: {
    base100: '#f9fbf5',
    base200: '#f0e9eb',
    base300: '#e7e1e3',
    baseContent: '#09182f',
    primary: '#fbd24c',
    secondary: '#fa3d43',
  },
  variables: VARIABLES,
})

const dark = defineTheme({
  colors: {
    base100: '#161915',
    base200: '#141313',
    base300: '#131513',
    baseContent: '#fffefc',
    neutral: '#d3d3d6',
    primary: '#fbd24c',
    secondary: '#fa3d43',
  },
  variables: VARIABLES,
})

export default <Partial<Config>>{
  content: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue', './app.vue'],
  darkMode: ['class', 'data-theme'],
  theme: {},
  plugins: [masterClass, daisyui],
  masterClass: {
    name: 'qwe',
  },
  daisyui: {
    themes: [{ dark, light }],
    logs: false,
  },
}
