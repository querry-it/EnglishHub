/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#F0F9FF',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        secondary: {
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        }
      }
    },
  },
  plugins: [],
}
