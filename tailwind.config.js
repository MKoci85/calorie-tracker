/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: [
    "./index.html",
    "./src/**/*{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.1)',
        'md': '3px 3px 6px rgba(0, 0, 0, 0.15)',
        'lg': '4px 4px 8px rgba(0, 0, 0, 0.2)',
      }
    }
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        { 'text-shadow': (value) => ({ textShadow: value }) },
        { values: theme('textShadow') }
      );
    }),
  ],
}

