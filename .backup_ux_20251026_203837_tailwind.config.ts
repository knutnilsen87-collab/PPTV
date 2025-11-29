/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}','./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        poker: {
          primary:  '#0B0E13',
          secondary:'#111C2D',
          accent:   '#FFD166',
          deepgold: '#CFAE58',
          emerald:  '#00ECC3',
          royal:    '#F4355E',
          text:     '#EDEDEF',
          muted:    '#A6A7AD',
          border:   '#2A2B31',
        }
      },
      borderRadius: { lg: '12px', xl: '16px' },
      boxShadow: { elevate: '0 8px 24px rgba(0,0,0,.35)', glowGold: '0 0 20px rgba(255,209,102,.3)', glowEmerald:'0 0 24px rgba(0,255,198,.18)' },
      transitionDuration: { 120:'120ms', 200:'200ms', 320:'320ms' },
      transitionTimingFunction: { luxe: 'cubic-bezier(.22,.61,.36,1)' },
      container: { center: true, padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' }, screens: { '2xl': '1440px' } },
      fontFamily: {
        display: ['var(--font-manrope)', 'ui-sans-serif'],
        body:    ['var(--font-inter)', 'ui-sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
