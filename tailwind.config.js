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
      minWidth: {
        cell: "14rem",
      },
      maxWidth: {
        cell: "14rem",
      },
      width: {
        cell: "14rem",
      },
      height: {
        cell: "6rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
