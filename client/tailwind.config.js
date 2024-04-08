/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

const plugin = require('tailwindcss/plugin');


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {fontFamily: {
      mullish: ["Mulish", "sans-serif"],
    },
    colors: {
      deepBlue: "#02042a",
      lightBlue: "#2b84ea",
      lightBlue300: "#4b94ed",
      lightBlue500: "#0b72e7",
      greenLight: "#61cea6",
      grayText: "#818597",
      lightGray: "#e2e2e2",
      grayBlue: "#344a6c",
      deepBlueHead: "#162f56",
      gray2: "#525a76",


      green1:{
        light:'#79ff0045'
        // light:'#E4FEEC'

      },
      blue1:{
        light:"#ACE2E1"
      },
        input:{
          200:'#bcbfb970'
        }

    },},

   
  },
  plugins: [
    plugin(function({ addVariant }) {
        addVariant('current', '&.active');
    })
],
}