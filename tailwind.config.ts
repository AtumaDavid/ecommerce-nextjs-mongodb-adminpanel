import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#00B9AE", // Light Sea Green
          DEFAULT: "#037171", // Caribbean Current
          dark: "#03312E", // Dark Green
        },
        secondary: {
          light: "#02C3BD", // Robin Egg Blue
          DEFAULT: "#009F93", // Persian Green
        },
        neutral: {
          light: "#e0f2f1", // optional lighter shade for backgrounds
          dark: "#004d40", // optional darker shade for text or borders
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
