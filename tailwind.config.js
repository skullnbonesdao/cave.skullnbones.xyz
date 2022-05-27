module.exports = {
  darkMode: "class",
  daisyui: {
    themes: ["light", "dark"],
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin"), require("daisyui")],
};
