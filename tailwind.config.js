const { colors } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        18: "4rem",
      },
    },
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: "#FF0000",
      green: colors.green,
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
