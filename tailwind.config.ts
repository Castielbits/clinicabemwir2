import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F5F0E8",
          light: "#FAF7F2",
          dark: "#E8E0D0",
        },
        dark: {
          DEFAULT: "#5f2483",
          deep: "#3d1555",
        },
        ink: "#2d2d2d",
        muted: "#6b6b6b",
        butter: "#fde9a2",
        blush: "#fbdad0",
        sage: "#d4e198",
      },
      fontFamily: {
        // Corpo: Nunito (substituto Google Fonts do Avenir Next oficial do manual da marca)
        sans: ["var(--font-nunito)", "Avenir Next", "sans-serif"],
        // Títulos: Montserrat Black (fonte institucional oficial do manual Bem-wir)
        // A chave "serif" é mantida por compatibilidade (embora agora aponte pra sans)
        serif: ["var(--font-montserrat)", "Montserrat", "Helvetica Neue", "sans-serif"],
        display: ["var(--font-montserrat)", "Montserrat", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
