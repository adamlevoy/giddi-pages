/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#d3c396",
          secondary: "#0d9488",
          accent: "#7429c6",
          neutral: "#13151a",
          "base-100": "#ffffff",
          info: "#d8b4fe",
          success: "#a3e635",
          warning: "#fb923c",
          error: "#e11d48",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
