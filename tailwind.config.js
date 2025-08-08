/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Couleurs pour le mode clair
        light: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
          background: '#FFFFFF',
          surface: '#F8FAFC',
          text: '#1E293B',
          'text-secondary': '#64748B',
          border: '#E2E8F0',
          accent: '#F1F5F9'
        },
        // Couleurs pour le mode sombre
        dark: {
          primary: '#60A5FA',
          secondary: '#A78BFA',
          background: '#0F172A',
          surface: '#1E293B',
          text: '#F8FAFC',
          'text-secondary': '#94A3B8',
          border: '#334155',
          accent: '#1E293B'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}