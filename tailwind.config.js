/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff006e',
        'neon-blue': '#3a86ff',
        'neon-purple': '#8338ec',
        'dark-bg': '#030304',
        'card-bg': '#0a0b0e',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out infinite',
        'float-reverse': 'float-reverse 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-glow-delayed': 'pulse-glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse-opacity 4s ease-in-out infinite',
        'pulse-slower': 'pulse-opacity 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'scan-vertical': 'scan-vertical 8s ease-in-out infinite',
        'scan-horizontal': 'scan-horizontal 12s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { 'text-shadow': '0 0 10px #ff006e, 0 0 20px #ff006e, 0 0 30px #ff006e' },
          '100%': { 'text-shadow': '0 0 20px #ff006e, 0 0 30px #ff006e, 0 0 40px #ff006e' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        'pulse-opacity': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'gradient-shift': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'scan-vertical': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'scan-horizontal': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.neon-purple), 0 0 20px theme(colors.neon-purple)',
        'neon-hover': '0 0 10px theme(colors.neon-purple), 0 0 30px theme(colors.neon-purple)',
      },
    },
  },
  plugins: [],
} 