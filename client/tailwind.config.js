/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

   

    extend: {

      colors:{

        green1:{
          light:'#79ff0055'
        },
        blue1:{
          light:"#ACE2E1"
        },
          input:{
            200:'#bcbfb970'
          }
        
      },

    },
  },
  plugins: [],
}