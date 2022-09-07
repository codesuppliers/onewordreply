const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        one: {
          white: 'var(--white)',
          black: 'var(--black)',
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          background: 'var(--background)',
        },
      },
    },
  },
  plugins: [],
};
