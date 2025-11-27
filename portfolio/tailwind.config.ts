import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Euclidean Sage Scale
        sage: {
          50: '#f4f6f4',
          100: '#e5e9e5',
          200: '#c7d0c7',
          300: '#9daa9d',
          400: '#7a8b7a',
          500: '#5A6B5A', // Primary sage
          600: '#4a594a',
          700: '#3A4B3A',
          800: '#2f3c2f',
          900: '#283228',
        },
        // Core colors
        charcoal: '#3C3C3C',
        gold: {
          DEFAULT: '#C4A35A',
          light: '#D4B86A',
          dark: '#B4934A',
        },
        blackboard: '#1A1A1A',
        chalk: '#F5F5F0',
        offwhite: '#F8F8F6',
        cream: '#F5F1E6',
        // Brass for navigation
        brass: {
          DEFAULT: '#B5915A',
          light: '#C5A16A',
          dark: '#A5814A',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['IBM Plex Serif', 'Georgia', 'serif'],
        code: ['Fira Code', 'Consolas', 'monospace'],
        decorative: ['Spectral', 'Georgia', 'serif'],
      },
      fontSize: {
        // Fluid typography
        'hero': 'clamp(2.5rem, 5vw, 4.5rem)',
        'display': 'clamp(2rem, 4vw, 3.5rem)',
        'title': 'clamp(1.5rem, 3vw, 2.5rem)',
        'subtitle': 'clamp(1.25rem, 2.5vw, 2rem)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.15)',
        'elevated': '0 12px 48px rgba(0,0,0,0.25)',
        'drawer': '4px 0 20px rgba(0,0,0,0.3)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'inertia': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'typewriter': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'draw-in': 'drawIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'rotate-slow': 'rotateSlow 60s linear infinite',
        'chalk-write': 'chalkWrite 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        drawIn: {
          '0%': { strokeDashoffset: '1', opacity: '0' },
          '100%': { strokeDashoffset: '0', opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        chalkWrite: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'slate-texture': "url('/textures/slate.png')",
        'paper-texture': "url('/textures/paper.png')",
        'wood-texture': "url('/textures/wood.png')",
      },
    },
  },
  plugins: [],
};

export default config;
