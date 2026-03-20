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
        'hero-bg': '#0A1A10',
        surface: '#1C3325',
        'body-bg': '#F3F6F3',
        tint: '#E8F0E9',
      },
      fontFamily: {
        display: ['var(--font-red-hat-display)', 'sans-serif'],
        body: ['var(--font-red-hat-text)', 'sans-serif'],
        ui: ['var(--font-poppins)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
