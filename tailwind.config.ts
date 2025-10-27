import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // for next-themes
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            darkBg: "#ededed",
            lightBg: "#FFFFFF",
            primary: "#3EA6FF",
            testcolor: "#606060",
        }
    },
  },
  plugins: [],
};

export default config;
