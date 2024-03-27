/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'text': '#e0ecf5',
      'background': '#060e13',
      'primary': '#3c46b4',
      'secondary': '#211236',
      'accent': '#804fc4',
     },
  },
  plugins: [],
}

