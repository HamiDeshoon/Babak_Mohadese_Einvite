/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        champagne: {
          50: '#FAF8F2',
          100: '#F5EFE1',
          200: '#ECE0C6',
          300: '#E0CFA4',
          DEFAULT: '#F8F4E9',
        },
        ivory: {
          DEFAULT: '#FEFDFB',
          soft: '#FDFBF7',
          dark: '#F4EFE6',
        },
        gold: {
          light: '#F5E3B3',
          DEFAULT: '#D4AF37',
          deep: '#AA820A',
          muted: '#C5A059',
          foil: '#E5C158',
        },
        rose: {
          gold: '#B76E79',
          deep: '#9D4A55',
          blush: '#F2D2BD',
          silk: '#FDF6F0',
        },
        mahogany: {
          DEFAULT: '#3E2723',
          light: '#533833',
          dark: '#2A1A17',
        },
        warm: {
          gray: '#6D5B53',
          stone: '#8C7A72',
          dark: '#251E1C',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Lora', 'Georgia', 'serif'],
        display: ['Great Vibes', 'cursive'],
        persianSerif: ['Katibeh', 'Amiri', 'Sahel', 'Vazirmatn', 'serif'],
        persianSans: ['Vazirmatn', 'Sahel', 'system-ui', 'sans-serif'],
        persianDisplay: ['Aref Ruqaa', 'Lalezar', 'Katibeh', 'cursive'],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'gold-glow': '0 0 35px rgba(212, 175, 55, 0.25)',
        'rose-glow': '0 0 35px rgba(183, 110, 121, 0.25)',
        'luxury': '0 20px 50px -10px rgba(62, 39, 35, 0.08), 0 0 1px 1px rgba(183, 110, 121, 0.15)',
        'luxury-hover': '0 30px 60px -12px rgba(62, 39, 35, 0.15), 0 0 1px 1px rgba(212, 175, 55, 0.35)',
      },
      keyframes: {
        'twinkle': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(183, 110, 121, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)' },
        },
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'gentle-float': 'gentle-float 4s ease-in-out infinite',
        'shimmer': 'shimmer 4s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
