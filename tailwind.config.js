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
        cell: "6rem",
      },
      maxHeight: {
        cell: "10rem",
      },
      minWidth: {
        cell: "14rem",
      },
      maxWidth: {
        cell: "14rem",
      },
      width: {
        cell: "14rem",
        modal: "80vw",
      },
      height: {
        cell: "6rem",
        modal: "80vh",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
