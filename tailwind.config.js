const { borderColor } = require("tailwindcss/defaultTheme");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./layout/**/*.{js,ts,jsx,tsx}", "./helpers/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {  
      fontFamily: {
        content: ["Poppins", ...defaultTheme.fontFamily.sans],
        heading: ["Railway",...defaultTheme.fontFamily.sans]
      },
      colors: {
        nirmaan: {
          header: "#37423b",
          lighter: "#ECFEFF",
          light: "#A5F3FC",
          DEFAULT: "#38BDF8",
          dark: "#0891B2",
          darker: "#164E63",
        },
      },
      backgroundImage: {
        "hero":"url('/images/teamphoto.jpg')",
        "sparkle-pattern": "url('/images/confetti.png')",
      },
      fontWeight:{
        bold: 700
      }
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"),require('@tailwindcss/aspect-ratio'),],
};
