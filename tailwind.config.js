/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Lora', 'ui-serif', 'Georgia', 'serif'],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};