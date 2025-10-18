/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/web/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A2DFF',
          hover: '#0A0AC2',
          50: '#f0f2ff',
          100: '#e0e5ff',
          500: '#1A2DFF',
          600: '#0A0AC2',
          700: '#0808A0',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
        },
        brand: {
          navy: '#101828',
          blue: '#1A2DFF',
          purple: '#6A5AE0',
        }
      },
      screens: {
        'xs': '475px',
      },
      maxWidth: {
        'container': '1200px',
      },
      boxShadow: {
        'soft': '0 12px 36px rgba(0,0,0,0.06)',
        'soft-hover': '0 16px 48px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        'card': '16px',
      },
      transitionDuration: {
        '120': '120ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.2,0,0,1)',
      },
    },
  },
  plugins: [],
}
