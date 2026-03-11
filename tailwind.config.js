/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Courier New'", 'monospace'],
      },
      colors: {
        slate: {
          950: '#0f172a',
        },
        accent: {
          cyan: '#00d4ff',
          'cyan-dark': '#0099cc',
        }
      },
      backgroundColor: {
        'dark-bg': '#0a0e27',
        'card-dark': '#1a1a2e',
      }
    },
  },
  plugins: [],
}
