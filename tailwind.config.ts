import type { Config } from 'tailwindcss';
const {nextui} = require("@nextui-org/react");

const customFontSizes:any = {
  'xs': '0.75rem', // Example of a simple font size definition
  'sm': ['0.875rem', '1.25rem'], // Font size and line height
  'base': ['1rem', '1.5rem'], // Font size and line height
  'lg': ['1.125rem', '1.75rem'], // Font size and line height
  'xl': ['1.25rem', '1.75rem'], // Font size and line height
  '2xl': ['1.5rem', '2rem'], // Font size and line height
  '3xl': ['1.875rem', '2.25rem'], // Font size and line height
  '4xl': ['2.25rem', '2.5rem'], // Font size and line height
  '5xl': ['3rem', '1'], // Font size and line height
  '6xl': ['3.75rem', '1'], // Font size and line height
  '7xl': ['4.5rem', '1'], // Font size and line height
  '8xl': ['6rem', '1'], // Font size and line height
  '9xl': ['8rem', '1'], // Font size and line height
 }

const config: Config = {
  content: [
    
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js",
    // './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: customFontSizes,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      }
    },
  },
  // darkMode: "class",
  plugins: [require('flowbite/plugin')]
}
export default config
