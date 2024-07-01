import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        NotoSans: ['var(--font-noto-sans)', 'Noto Sans'],
        Line: ['var(--font-line)', 'Line'],
        Wave: ['var(--font-wave)', 'Wave'],
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
    themes: false,
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
