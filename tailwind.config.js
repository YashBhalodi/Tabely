/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const disabledCss = {
  "code::before": false,
  "code::after": false,
};

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: { css: disabledCss },
        sm: { css: disabledCss },
        md: { css: disabledCss },
        lg: { css: disabledCss },
        xl: { css: disabledCss },
      },
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
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};
