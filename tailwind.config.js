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
          green: '#2a843f',
          blue: '#004089',
          text: '#ebedef',
          bg: '#3c424f',
        }
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      fontSize: {
        'menu': '12px',
        'title': '24px',
        'body': '12px',
        'button': '14px',
      },
      fontWeight: {
        'menu': '700',
        'title': '700',
      }
    },
  },
  plugins: [],
}
