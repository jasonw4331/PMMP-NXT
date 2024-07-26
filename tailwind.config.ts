import type { Config } from 'tailwindcss'

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-roboto-mono)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwind-children'),
    require('daisyui'),
  ],
  darkMode: 'class',

  // daisyUI config (optional)
  daisyui: {
    themes: ['business', 'emerald'],
    darkTheme: 'business',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: process.env.NODE_ENV === 'development',
    rtl: false,
    themeRoot: ':root',
  },
} satisfies Config
