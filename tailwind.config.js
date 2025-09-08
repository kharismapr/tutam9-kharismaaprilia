/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e3e8e3',
          200: '#ccd4cc',
          300: '#aeb8ae',
          400: '#9dc183',
          500: '#6b776b',
          600: '#515c51',
          700: '#404840',
          800: '#343934',
          900: '#2b2f2b',
        }
      }
    },
  },
  plugins: [],
}