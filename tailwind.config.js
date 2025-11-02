/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e2936',
          light: '#304057',
          dark: '#101726',
        },
        secondary: {
          DEFAULT: '#304057',
          light: '#3d506b',
          dark: '#1e2936',
        },
        accent: {
          DEFAULT: '#145cfb',
          light: '#3d7cfc',
          dark: '#0d47c9',
        },
        background: {
          DEFAULT: '#0e162a',
          dark: '#06070a',
          card: '#232b3e',
        },
        text: {
          primary: '#fefefe',
          secondary: '#dddbdb',
          light: '#e0e0e0',
          dark: '#fefefe',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
