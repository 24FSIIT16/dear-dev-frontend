import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        // general colors
        white: '#ffffff',
        black: '#000000',

        // primary colors (logo)
        primaryGreen: '#41B963',
        primaryRed: '#E94B68',
        primaryBlue: '#4E8AE3',

        // background colors
        primaryBG: {
          dark: '#121212',
          light: '#F0F0F0',
        },
        secondaryBG: {
          dark: '#232323',
          light: '#FFFFFF',
        },
        tertiaryBG: {
          dark: '#333333',
          light: '#F0F0F0',
        },
      },
    },
  },
  plugins: [],
};
export default config;
