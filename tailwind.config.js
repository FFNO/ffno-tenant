import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            primary: {
              50: "#edecfb",
              100: "#e2e0fc",
              200: "#c6c1f9",
              300: "#a9a3f6",
              400: "#8d84f3",
              500: "#7065f0",
              600: "#5a51c0",
              700: "#433d90",
              800: "#2d2860",
              900: "#161430",
              DEFAULT: "#7065f0",
            },
            foreground: "#100A55",
          }, // light theme colors
        },
      },
    }),
  ],
};
