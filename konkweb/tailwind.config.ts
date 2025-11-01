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
        background: "var(--background)",
        foreground: "var(--foreground)",
        charcoal: "#0F172A",
        slate: "#111827",
        concrete: {
          DEFAULT: "#374151",
          500: "#6B7280",
        },
        amber: "#F59E0B",
        emerald: "#10B981",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Plus Jakarta Sans", "Manrope", "ui-sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
export default config;
