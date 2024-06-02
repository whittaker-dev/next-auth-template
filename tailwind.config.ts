import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "header-desktop": "73px",
      },
      margin: {
        "header-desktop": "73px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
      },
      colors: {
        black: "#000",
        white: "#fff",
        "dark-primary": "#1F2B24",
        "gray-charade": "#2C2F3A",
        "deep-cove": "#050A44",
        "blue-primary": "#0A21C0",
        "green-primary": "#27AE60",
        "gray-bombay": "#B3B4BD",
        "wild-sand": "#F5F5F5",
        "green-primary-800": "#1A4D2E",
        "green-primary-600": "#4F6F52",
        "green-primary-400": "#E8DFCA",
        "green-primary-200": "#F5EFE6",
      },
      boxShadow: {
        linear:
          "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(64, 68, 82, 0.16) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(64, 68, 82, 0.08) 0px 2px 5px 0px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
