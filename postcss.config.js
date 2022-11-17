module.exports = {
  purge: {
    options: {
      safelist: [/data-theme$/],
    },
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
