/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router
    "./components/**/*.{js,ts,jsx,tsx}", // Componentes
    "./lib/**/*.{js,ts,jsx,tsx}", // Utils (se usar)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
