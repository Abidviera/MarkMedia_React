/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lens-red': '#E8102A',
        'lens-red-dim': '#C0001F',
        'lens-black': '#080808',
        'lens-off-white': '#F5F5F3',
        'lens-gray-light': '#EBEBEB',
        'lens-gray-mid': '#999999',
      },
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'sans-serif'],
        'cormorant': ['"Cormorant Garamond"', 'serif'],
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        'space-mono': ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(80px, 15vw, 220px)',
        'section': 'clamp(48px, 8vw, 120px)',
        'subtext': 'clamp(14px, 1.5vw, 18px)',
      },
    },
  },
  plugins: [],
}
