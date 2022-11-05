/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.{js,ts,jsx,tsx}',
  ],
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
    darkTheme: 'business',
  },
}
