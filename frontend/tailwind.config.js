/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          50: "#f8fafc",
          100: "#e2e8f0",
          200: "#cbd5e1",
          300: "#94a3b8",
          400: "#64748b",
          500: "#475569",
          600: "#334155",
          700: "#1e293b",
          800: "#1a1a2e",
          900: "#0f0f1a",
          950: "#0a0a14",
        },
        accent: {
          400: "#22c55e",
          500: "#16a34a",
          600: "#15803d",
        },
      },
    },
  },
  plugins: [],
};
