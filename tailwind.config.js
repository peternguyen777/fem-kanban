/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        purple_main: "#635FC7",
        purple_hover: "#A8A4FF",
        red_main: "#EA5555",
        red_hover: "#FF9898",
        grey_verydark: "#20212C",
        grey_dark: "#2B2C37",
        grey_medium: "#828FA3",
        grey_light: "#F4F7FD",
        lines_dark: "#3E3F4E",
        lines_light: "#E4EBFA",
        black: "#000112",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
