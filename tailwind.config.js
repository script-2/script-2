/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: '#f6d6bd',
        dark: '#08141e',
      },
      fontFamily: {
        mono: ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
}
