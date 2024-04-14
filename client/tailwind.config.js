/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

const plugin = require('tailwindcss/plugin');


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    screens: {
      'all': '100px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '1024px',
      // => @media (min-width: 1024px) { ... }

      'lg': '1280px'
    },

    extend: {
      
      fontFamily: {
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
      richblack: {
        5: "#F1F2FF",
        25: "#DBDDEA",
        100: "#AFB2BF",
        200: "#999DAA",
        700: "#2C333F",
        800: "#161D29",
        900: "#000814",
      },


      green1:{
        light:'#79ff0045',
        // light:'#E4FEEC'
        dark:'#FF1100',

        dark2:'#3d3d3d'

      },
      

      blue1:{
        light:"#DFF0FF",

      },
        input:{
          200:'#bcbfb970'
        }

    },
  

    backgroundImage: {
      'homeBg': "url('https://res.cloudinary.com/dby1pwcbx/image/upload/v1713072559/shaym/ki5jphmk3qs6itca8zvx.jpg')",
      // 'footer-texture': "url('/img/footer-texture.png')",
    }

  
  
  },

   
  },
  plugins: [
    plugin(function({ addVariant }) {
        addVariant('current', '&.active');
    })
],
}