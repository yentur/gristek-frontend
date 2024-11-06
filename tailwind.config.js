/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'Arial', 'Helvetica', 'sans-serif'],
      },
      backgroundImage: {
        'back': "url('/src/dist/images/bg.jpg')",
      },
      boxShadow: {
        '3xl': 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;',
      }
    },
    fontSize:{
      xxs: ['12px', '14px'],
      xxm: ['14px', '16px'],
    },
    colors: {
      "pc":{
      100:"#4f46d6",
      200:"#5f56c6",
      },
    },
    container: {
      screens: {
        sm: '100%', 
        md: '728px', 
        lg: '1024px', 
        xl: '1024px', 
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

