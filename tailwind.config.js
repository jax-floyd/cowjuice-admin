module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Source Code Pro', 'monospace'],
      },
      keyframes: {
        'slide-up-fade-out': {
          '0%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(-1600%)',
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
      },
      animation: {
        'slide-up-fade-out': 'slide-up-fade-out 1s ease-out',
        'slide-down-fade-in': 'slide-down-fade-in 1s ease-out',
        'slide-up-fade-in': 'slide-up-fade-in 1s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
  darkMode: 'media',
};
