/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "380px",
      },
      colors: {
        sent: "#D13328",
        received: "#349766",
        accent: "#3B82F6",
        gray: "#888FA2",
        primary_light: "#314CA3",
        secondary_light: "#8F9ED7",
        bg_light: "#FFFFFF",
        text_light: "#172554",
        primary_dark: "#5A75CE",
        secondary_dark: "#293770",
        bg_dark: "#0C1221",
        text_dark: "#ABB9E8",
      },
    },
  },
  plugins: [],
};
