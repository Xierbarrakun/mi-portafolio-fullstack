/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0d1117',
        darkCard: '#161b22',
        accentOrange: '#ff5a36',
      },
    },
  },
  plugins: [],
}
