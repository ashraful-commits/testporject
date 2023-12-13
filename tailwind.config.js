/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        WorkSans: ["Work Sans", "sans-serif"],
        Lato: ["Lato", "sans-serif"],
      },
      colors: {
        black: "#230B34",
        mediumBlack: "#202023",
        lightBlack: "#F2F2F2",
        darkBlack: "#17171A",
        darkBlue: "#256682",
        lightBlue: "#267596",
        lightGreen: "#5CCE75",
        darkGreen: "#3AAE54",
        lightOrange: "#F2994A",
        lightGray: "#DFDFDF",
      },
    },
    plugins: [
      function ({ addUtilities }) {
        const newUtilities = {
          ".scrollbar-custom": {
            "::-webkit-scrollbar": {
              width: "2px", // Adjust the width as needed
              height: "2px", // Adjust the height as needed
            },
            "::-webkit-scrollbar-thumb": {
              background: "#fff", // Change the color as needed
            },
            "::-webkit-scrollbar-track": {
              background: "#E5E7EB", // Change the track color as needed
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "#805AD5", // Change hover color as needed
            },
          },
        };
        addUtilities(newUtilities, {
          variants: ["responsive"],
        });
      },
    ],
  },
  plugins: [],
};
