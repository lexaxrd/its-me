/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
  './src/app/**/*.{js,ts,jsx,tsx}',
  './src/pages/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
  './src/layouts/**/*.{js,ts,jsx,tsx}',
],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '600px',
        md: '768px',
        lg: '1120px',
        xl: '1140px',
        '2xl': '1140px',
      }
    },
    extend: {},
  },
  plugins: [],
}
