import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Be Vietnam Pro", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      addCommonColors: true,
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
