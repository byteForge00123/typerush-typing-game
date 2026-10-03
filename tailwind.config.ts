import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0b0d0f",
        surface: "#111417",
        raised: "#171b1f",
        line: "#252b30",
        muted: "#777f87",
        accent: "#c6f36a",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
