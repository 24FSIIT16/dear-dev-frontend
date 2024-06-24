import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        // general colors
        white: '#ffffff',
        black: '#000000',

        // primary colors (logo)
        primaryGreen: {
          main: 'rgba(65, 185, 99)',
          light: 'rgba(65, 185, 99, 0.2)',
        },
        primaryRed: {
          main: 'rgba(233, 75, 104)',
          light: 'rgba(233, 75, 104, 0.2)',
        },
        primaryBlue: {
          main: 'rgba(78, 138, 227)',
          light: 'rgba(78, 138, 227, 0.2)',
        },

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
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
