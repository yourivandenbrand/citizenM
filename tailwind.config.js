/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        chalet: ['Chalet', 'sans-serif'],
      },
      fontSmoothing: {
        'webkit': '-webkit-font-smoothing: antialiased',
        'moz': '-moz-osx-font-smoothing: grayscale',
      },
    },
  },
  plugins: [],
}

