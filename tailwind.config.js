/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'sans-serif'],
      },
      colors: {
        deep: {
          blue: '#09090b',
          dark: '#000000',
        },
        electric: {
          blue: '#6366f1',
          light: '#818cf8',
          cyan: '#A7F3D0',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-down': 'fadeInDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'liquid-1': 'liquid-flow-1 20s ease-in-out infinite',
        'liquid-2': 'liquid-flow-2 25s ease-in-out infinite',
        'liquid-3': 'liquid-flow-3 18s ease-in-out infinite',
        'shimmer': 'shimmer-sweep 3s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.25)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backdropBlur: {
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}
