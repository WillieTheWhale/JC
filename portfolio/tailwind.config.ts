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
        // ─── Primary Palette: Warm Library Tones ───
        walnut: {
          DEFAULT: '#2D1810',
          deep: '#1A0F0A',
          light: '#3D2820',
        },
        mahogany: {
          DEFAULT: '#4A2C2A',
          light: '#5A3C3A',
          dark: '#3A1C1A',
        },
        oak: {
          DEFAULT: '#5C4033',
          light: '#7C6053',
          dark: '#3C2013',
        },

        // ─── Parchment & Paper ───
        parchment: {
          DEFAULT: '#E8DCC4',
          aged: '#D4C4A8',
          light: '#F5EFE0',
        },
        vellum: '#F5EFE0',
        ivory: '#FFFEF7',
        sepia: '#704214',

        // ─── Metallic Accents ───
        gold: {
          DEFAULT: '#C9A227',
          leaf: '#D4AF37',
          dark: '#B89217',
        },
        brass: {
          DEFAULT: '#8B7355',
          tarnished: '#6B5344',
          polished: '#A08565',
        },
        copper: '#B87333',

        // ─── Atmospheric Colors ───
        ink: '#1A1612',
        charcoal: '#2C2824',
        shadow: '#0D0906',

        // ─── Chalkboard ───
        slate: {
          DEFAULT: '#1E2D2F',
          deep: '#141F20',
          light: '#2E3D3F',
        },
        chalk: {
          white: '#F5F5F0',
          yellow: '#F5E6A3',
          pink: '#E8B4B8',
          blue: '#A8C5D8',
        },

        // ─── Accent Colors ───
        sage: {
          DEFAULT: '#5A6B5A',
          light: '#7A8B7A',
          dark: '#3A4B3A',
        },
        burgundy: '#722F37',
        forest: '#2D4A3E',
      },

      fontFamily: {
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['EB Garamond', 'Crimson Pro', 'Georgia', 'serif'],
        code: ['Fira Code', 'Consolas', 'monospace'],
        decorative: ['Spectral', 'Georgia', 'serif'],
      },

      fontSize: {
        // Fluid typography
        'hero': 'clamp(2.5rem, 6vw, 4.5rem)',
        'display': 'clamp(2rem, 4vw, 3.5rem)',
        'title': 'clamp(1.5rem, 3vw, 2.5rem)',
        'subtitle': 'clamp(1.25rem, 2.5vw, 2rem)',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      boxShadow: {
        'card': '0 4px 6px rgba(13, 9, 6, 0.15), 0 10px 20px rgba(13, 9, 6, 0.1), 0 1px 3px rgba(13, 9, 6, 0.2)',
        'card-hover': '0 8px 16px rgba(13, 9, 6, 0.2), 0 20px 40px rgba(13, 9, 6, 0.15), 0 2px 6px rgba(13, 9, 6, 0.25)',
        'elevated': '0 25px 50px rgba(13, 9, 6, 0.3), 0 10px 20px rgba(13, 9, 6, 0.2)',
        'inset': 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
        'chalkboard': 'inset 0 0 60px rgba(0, 0, 0, 0.3), 0 10px 40px rgba(0, 0, 0, 0.4)',
        'wood-frame': '0 0 0 8px #5C4033, 0 0 0 10px #6B5344, 0 15px 40px rgba(0,0,0,0.4)',
        'glow-gold': '0 0 20px rgba(201, 162, 39, 0.3)',
      },

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'weighted': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'typewriter': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },

      animation: {
        'draw-in': 'drawIn 1.2s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'rotate-slow': 'rotateSlow 60s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'flicker': 'flicker 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'chalk-write': 'writeChalk var(--write-duration, 3s) ease-out forwards',
        'dust-drift': 'dustDrift 2s ease-out forwards',
      },

      keyframes: {
        drawIn: {
          '0%': { strokeDashoffset: '1', opacity: '0' },
          '100%': { strokeDashoffset: '0', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' },
          '75%': { opacity: '0.98' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        writeChalk: {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
        dustDrift: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0.6' },
          '100%': { transform: 'translateY(40px) translateX(20px)', opacity: '0' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-walnut': 'linear-gradient(180deg, #2D1810 0%, #1A0F0A 100%)',
        'gradient-parchment': 'linear-gradient(135deg, #E8DCC4 0%, #D4C4A8 100%)',
        'gradient-gold': 'linear-gradient(180deg, #D4AF37 0%, #C9A227 50%, #8B7355 100%)',
        'gradient-brass': 'linear-gradient(180deg, #8B7355 0%, #6B5344 100%)',
        'candlelight': 'radial-gradient(ellipse at top, rgba(244, 208, 63, 0.06) 0%, rgba(244, 208, 63, 0.02) 40%, transparent 70%)',
        'vignette': 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(13, 9, 6, 0.4) 100%)',
      },

      borderRadius: {
        'sm': '2px',
      },
    },
  },
  plugins: [],
};

export default config;
