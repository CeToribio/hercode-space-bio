/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-space":
          "linear-gradient(to bottom, #cdbada, #bc78c8, #033096, #010b22, #000000)",
      },
      fontFamily: {
        suse: ["'SUSE Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
