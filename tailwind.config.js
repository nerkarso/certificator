const { coolGray, cyan } = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: ['./+(pages|elements|components)/**/*.js'],
  theme: {
    extend: {
      colors: {
        base: coolGray,
        primary: cyan,
      },
      fontFamily: {
        noto: '"Noto Sans"',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
