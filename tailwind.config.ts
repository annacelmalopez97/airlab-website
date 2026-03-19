import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#30C7B5',
          dark: '#00AC97',
        },
        charcoal: '#14261C',
        'body-bg': '#F3F6F3',
      },
      fontFamily: {
        display: ['var(--font-red-hat-display)', 'sans-serif'],
        body: ['var(--font-red-hat-text)', 'sans-serif'],
        ui: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
