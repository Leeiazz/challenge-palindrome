import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        lead: {
          DEFAULT: '#1E1F20',
          50: '#CBCCCE',
          100: '#C0C2C4',
          200: '#ABAEB0',
          300: '#96999D',
          400: '#818589',
          500: '#6D7174',
          600: '#595C5F',
          700: '#45484A',
          800: '#323335',
          900: '#1E1F20',
          950: '#101112',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
