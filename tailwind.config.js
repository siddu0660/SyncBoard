/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        position: "top, left, bottom, right",
        colors: "background-color, color",
      },
      transitionDuration: {
        300: "300ms",
        400: "400ms",
      },
      colors: {
        "custom-dark-text": "#f7fafc",
        "custom-light-text": "#2d3748",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      fontSize: ["focus", "valid"],
      fontWeight: ["focus", "valid"],
      top: ["focus", "valid"],
    },
  },
  plugins: [],
};

