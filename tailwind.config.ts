import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0B4DBA",
          dark: "#082E73",
          soft: "#EAF1FF"
        }
      },
      maxWidth: {
        reading: "78ch"
      },
      boxShadow: {
        soft: "0 16px 42px rgba(9, 22, 43, 0.07)"
      }
    }
  },
  plugins: []
};

export default config;
