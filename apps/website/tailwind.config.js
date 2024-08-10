const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },

      fontFamily: {
        workSans: ["Work Sans", "sans-serif"],
      },
      animation: {
        "infinite-scroll-r-to-l": "infinite-scroll-r-to-l 40s linear infinite",
        "infinite-scroll-l-to-r": "infinite-scroll-l-to-r 40s linear infinite",
        "border-animation": "border-radius 10s ease-in-out infinite",
      },
      keyframes: {
        "infinite-scroll-r-to-l": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "infinite-scroll-l-to-r": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "border-radius": {
          "0%": {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          "59%": {
            borderRadius: "30% 60% 70% 40% / 50% 60% 30%",
          },
          "100%": {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }), 
  ],
};
