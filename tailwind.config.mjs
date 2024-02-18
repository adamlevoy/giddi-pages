/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      xs: "400px",
      ...defaultTheme.screens
    },
    extend: {}
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#d3c396",
          secondary: "#5b21b6",
          accent: "#a78bfa",
          neutral: "#13151a",
          "base-100": "#ffffff",
          info: "#d8b4fe",
          success: "#a3e635",
          warning: "#fb923c",
          error: "#e11d48"
        }
      }
    ]
  },
  plugins: [require("daisyui")]
};
