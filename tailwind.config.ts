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
          DEFAULT: "#FF5A36",
          dark: "#E64722",
          soft: "#FFE8E2"
        }
      },
      maxWidth: {
        reading: "78ch"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 21, 31, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;

