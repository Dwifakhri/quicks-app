/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_blue: "#2F80ED",
        primary_1: "#4F4F4F",
        primary_2: "#828282",
        primary_3: "#E0E0E0",
        indicator_orange: "#F8B76B",
        indicator_blue: "#8785FF",
        indicator_red: "#EB5757",
        indicator_yellow: "#F2C94C",
        quick_bg: "#F2F2F2",
      },
    },
  },
  plugins: [require("daisyui")],
};
