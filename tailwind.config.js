module.exports = {
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      transitionDuration: {
        2000: "2000ms",
        1500: "1500ms",
      },
    },
  },
};
