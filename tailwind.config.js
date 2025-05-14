module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Source Code Pro', 'monospace'],
        sans: ['Custard Condensed', 'sans-serif'],
        serif: ['Galliard', 'serif'],
      },
      colors: {
        'cowjuice-brown': "#4E2817",
        'cowjuice-bronze': "#B15A33",
        'cowjuice-gold': "#E3B27E",
        'cowjuice-red': "#BF0A30",
        'cowjuice-blue': "#002868"
      },
      keyframes: {
        'fade-out': {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        'slide-up-fade-out': {
          '0%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(-800%)',
            opacity: 0,
          },
        },
        'slide-left-fade-out': {
          '0%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateX(-50%)',
            opacity: 0,
          },
        },
        'slide-down-fade-in': {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0%)',
            opacity: 1,
          },
        },
        'slide-up-fade-in': {
          '0%': {
            transform: 'translateY(100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        'progress': {
          '0%': { 
            width: '0%' 
          }, 
          '100%': { 
            width: "100%" 
          },
        },
        'color-cycle': {
          '0%,100%' : { color: '#000000' },   // start / reset
          '25%'     : { color: '#000000' },   // red
          '50%'     : { color: '#FFF' },   // teal‑ish
          '75%'     : { color: '#FFF' },   // indigo
        },
        ticker: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'fade-out': 'fade-out 0.2s ease-out',
        'slide-up-fade-out': 'slide-up-fade-out 1s ease-out',
        'slide-left-fade-out': 'slide-left-fade-out 1s ease-out',
        'slide-down-fade-in': 'slide-down-fade-in 1s ease-out',
        'slide-up-fade-in': 'slide-up-fade-in 1s ease-out',
        'progress': 'progress 5s linear forwards',
        'color-cycle': 'color-cycle 8s linear infinite',
        'ticker': 'ticker 28s linear infinite'
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
  darkMode: 'class',
};
