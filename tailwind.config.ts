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
        background: {
          100: "",
          200: "",
          300: "",
          400: "#FCF8EC",
          500: "#F0E8D2",
          600: "#C6BB9E",
          700: "",
          800: "",
          900: "",
          950: "",
        },
        bot: "#D0E8F2",
        user: "#79A3B1",
      },
    },
  },

  plugins: [],
};
export default config;
