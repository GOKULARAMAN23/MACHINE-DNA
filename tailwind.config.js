/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          950: '#07090D',
          900: '#0B0F15',
          850: '#10151E',
          800: '#161D29',
          700: '#212B3B',
          600: '#323F54',
          500: '#4A5B75',
          400: '#7E8FA8',
          300: '#A9B7CC',
          200: '#D2DBE8',
          100: '#EAF0F8',
        },
        cyan: {
          DEFAULT: '#00F0FF',
          glow: 'rgba(0, 240, 255, 0.4)',
          dim: '#008b94',
        },
        amber: {
          DEFAULT: '#FFB800',
          glow: 'rgba(255, 184, 0, 0.4)',
          dim: '#b38100',
        },
        danger: {
          DEFAULT: '#FF334B',
          glow: 'rgba(255, 51, 75, 0.4)',
          dim: '#b31e30',
        },
        phosphor: {
          DEFAULT: '#00E676',
          glow: 'rgba(0, 230, 118, 0.4)',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        'telemetry-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'telemetry-flow': 'telemetry-flow 3s linear infinite',
      }
    },
  },
  plugins: [],
}
