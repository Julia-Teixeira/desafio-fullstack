import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        thistle: "#D8BFD8",
        plum: "#DDA0DD",
   
      },
      keyframes: {
        drop: {
          "0%": {
            transform: "translateY(-60%)",
          },
        },
        show: {
          "0%": {
            transform: "scale(0.4)",
          },
        },
      },
      animation: {
        modal: "drop 0.5s ease-in-out",
        show: "show 0.7s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
