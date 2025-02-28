import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: 'var(--font-raleway)',
        roboto: 'var(--font-roboto)',
      },
      colors: {
        primary: '#7C4EE4',
        'grey-33': '#333333',
        'grey-66': '#666666',
        'grey-99': '#999999',
      },
      screens: {
        desktop: '1440px',
      },
    },
  },
  plugins: [],
} satisfies Config;
