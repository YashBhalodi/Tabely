/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      minHeight: {
        6: "6rem",
      },
      minWidth: {
        14: "14rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
