/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#101114',
          secondary: '#181A1F',
          surface: '#22252B',
          'surface-hover': '#2A2E36',
          border: '#2E333D',
        },
        accent: {
          green: '#A5E849',
          'green-light': '#B9F465',
          'green-glow': 'rgba(165, 232, 73, 0.25)',
          red: '#E63B36',
          'red-light': '#F0524E',
          'red-glow': 'rgba(230, 59, 54, 0.25)',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#A0A4AA',
          muted: '#686D76',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'Sora', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 25px -5px rgba(165, 232, 73, 0.45)',
        'glow-green-sm': '0 0 15px -3px rgba(165, 232, 73, 0.35)',
        'glow-red': '0 0 25px -5px rgba(230, 59, 54, 0.45)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'carbon-pattern': "radial-gradient(#22252B 15%, transparent 16%)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
