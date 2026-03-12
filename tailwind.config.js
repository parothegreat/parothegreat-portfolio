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
        // Cyberpunk neon colors
        neon: {
          cyan: '#00f0ff',
          'cyan-dark': '#0088ff',
          magenta: '#ff006e',
          'magenta-light': '#ff1493',
          purple: '#b300ff',
          'purple-light': '#d946ef',
          green: '#39ff14',
          'green-dark': '#00d084',
          pink: '#ff10f0',
          blue: '#0080ff',
        },
        cyber: {
          'bg': '#0a0e27',
          'bg-dark': '#050812',
          'bg-secondary': '#1a1a2e',
          'border': '#00f0ff',
          'border-subtle': '#2a4d4d',
          'grid': '#0a4d4d',
        },
        slate: {
          950: '#0f172a',
        },
        accent: {
          cyan: '#00f0ff',
          'cyan-dark': '#0088ff',
        }
      },
      backgroundColor: {
        'dark-bg': '#0a0e27',
        'card-dark': '#1a1a2e',
        'cyber-dark': '#050812',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3)',
        'neon-magenta': '0 0 20px rgba(255, 1, 110, 0.5), 0 0 40px rgba(255, 1, 110, 0.3)',
        'neon-purple': '0 0 20px rgba(179, 0, 255, 0.5), 0 0 40px rgba(179, 0, 255, 0.3)',
        'neon-green': '0 0 20px rgba(57, 255, 20, 0.5), 0 0 40px rgba(57, 255, 20, 0.3)',
        'neon-glow': '0 0 30px rgba(0, 240, 255, 0.6), inset 0 0 20px rgba(0, 240, 255, 0.1)',
      },
      textShadow: {
        'neon-cyan': '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.5)',
        'neon-magenta': '0 0 10px rgba(255, 1, 110, 0.8), 0 0 20px rgba(255, 1, 110, 0.5)',
        'neon-purple': '0 0 10px rgba(179, 0, 255, 0.8), 0 0 20px rgba(179, 0, 255, 0.5)',
        'neon-green': '0 0 10px rgba(57, 255, 20, 0.8), 0 0 20px rgba(57, 255, 20, 0.5)',
      },
      borderColor: {
        neon: {
          cyan: '#00f0ff',
          magenta: '#ff006e',
          purple: '#b300ff',
          green: '#39ff14',
        }
      },
      animation: {
        'neon-flicker': 'neonFlicker 0.15s infinite, neonFlickerAlt 0.3s infinite',
        'neon-glow': 'neonGlow 2s ease-in-out infinite',
        'scan-lines': 'scanLines 8s linear infinite',
        'glitch': 'glitch 0.2s infinite',
      },
      keyframes: {
        neonFlicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            'text-shadow': '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.3)',
          },
          '20%, 24%, 55%': {
            'text-shadow': 'none',
          }
        },
        neonFlickerAlt: {
          '0%, 100%': { 'opacity': '0.8' },
          '50%': { 'opacity': '1' }
        },
        neonGlow: {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(0, 240, 255, 0.5)' },
          '50%': { 'box-shadow': '0 0 40px rgba(0, 240, 255, 0.8)' }
        },
        scanLines: {
          '0%': { 'transform': 'translateY(-100%)' },
          '100%': { 'transform': 'translateY(100vh)' }
        },
        glitch: {
          '0%': { 'transform': 'translate(0)' },
          '20%': { 'transform': 'translate(-2px, 2px)' },
          '40%': { 'transform': 'translate(-2px, -2px)' },
          '60%': { 'transform': 'translate(2px, 2px)' },
          '80%': { 'transform': 'translate(2px, -2px)' },
          '100%': { 'transform': 'translate(0)' }
        }
      }
    },
  },
  plugins: [],
}
