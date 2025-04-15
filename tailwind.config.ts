/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'tess-blue': '#170F49',
        'tess-gray': '#6F6C90',
      },
      dropShadow: {
        glow: [
          '0 0px 20px rgba(255,255, 255, 0.35)',
          '0 0px 65px rgba(255, 255,255, 0.2)',
        ],
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
        input: '1rem',
      },
      spacing: {
        'input-height': '4rem',
      },
      // fontFamily: {
      //     roboto: ['var(--font-roboto)', 'Roboto', 'sans-serif'],
      //     openSans: ['var(--font-open-sans)', 'Open Sans', 'sans-serif'],
      //     spaceGrotesk: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
      // }
    },
  },
  plugins: [],
};
