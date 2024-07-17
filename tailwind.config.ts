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
        primary: {
          DEFAULT: "#ffffff",
        },
        accent: {
          DEFAULT: "#FD4A03",
          hover: "#ff8c00",
        },
      },
      textColor: {
        DEFAULT: "#ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
