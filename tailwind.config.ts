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
        // 70% - Background / Base
        cream: {
          50: "#FAFAF8",
          100: "#F5F4F0",
          200: "#EDECEA",
          300: "#E0DED9",
        },
        // 20% - Navy / Text
        navy: {
          50: "#EEF2F6",
          100: "#C8D4DF",
          500: "#3A5570",
          700: "#1E3448",
          900: "#0F1E2B",
        },
        // 10% - Gold Accent
        gold: {
          300: "#DFB97A",
          400: "#C9A05A",
          500: "#B8883C",
          600: "#9A6E28",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-montserrat)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
