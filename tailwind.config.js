/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#9333EA',
        accent: '#F59E0B',
        neutral: '#374151',
        base: '#F3F4F6',
        info: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        school: {
          light: '#F3F4F6',
          DEFAULT: '#1D4ED8',
          dark: '#1E3A8A',
        },
        extra: '#FF5733',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
