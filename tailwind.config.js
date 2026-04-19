/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["quicksand", "sans-serif"],
        quicksandbold: ["quicksandbold", "sans-serif"],
        quicksandlight: ["quicksandlight", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 132, 199, 0.08)",
      },
    },
  },
  plugins: [],
};
