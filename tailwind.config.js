module.exports = {
  mode: 'jit',
  content: [
    './public/**/*.{js,ts,jsx,tsx,html}',
    './pages/**/*.{js,ts,jsx,tsx,html}',
    './components/**/*.{js,ts,jsx,tsx,html}',
    './lib/**/*.{js,ts,jsx,tsx,html}',
    'node_modules/daisyui/dist/**/*.js',
  ],
  safelist: ['dark'], //specific classes
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('daisyui'),
  ],
  darkMode: 'class',

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: process.env.NODE_ENV === 'development',
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
}
