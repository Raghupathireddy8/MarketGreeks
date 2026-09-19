/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        ink: '#2D2A26',
        coral: '#FF7B54',
        mint: '#2EC4B6',
        sky: '#64B5F6',
        butter: '#FFD166',
        lilac: '#CDB4DB',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'cursive', 'sans-serif'],
        sans: ['"Quicksand"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}