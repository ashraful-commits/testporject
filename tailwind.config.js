/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      fontFamily: {
        'Roboto': ['Roboto', 'sans-serif'],
        'WorkSans': ['Work Sans', 'sans-serif'],
        'Lato': ['Lato', 'sans-serif'],
      },
      colors: {
        black:'#230B34',
        mediumBlack: '#202023',
        lightBlack: '#F2F2F2',
        darkBlack: '#17171A',
        darkBlue: '#256682',
        lightBlue: '#267596',
        lightGreen:'#5CCE75',
        darkGreen:'#3AAE54',
        lightOrange:'#F2994A',
        lightGray:'#DFDFDF',
      },
    },
  },
  plugins: [],
}