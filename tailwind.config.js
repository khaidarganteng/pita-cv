/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pita: { 50: '#fdf6ff', 100: '#f8ebff', 200: '#efd5ff', 300: '#e2b7fb', 400: '#cf92f5', pink: '#f472a8', pink2: '#ffc2dc', ink: '#44304f', muted: '#9a86a6', line: '#eddcf5', mint: '#bdf0dc', butter: '#fff1b8' },
      },
      fontFamily: { display: ['var(--font-fredoka)', 'ui-rounded', 'sans-serif'], body: ['var(--font-nunito)', 'system-ui', 'sans-serif'] },
      boxShadow: { soft: '0 12px 34px rgba(207,146,245,.25)', pop: '0 5px 0 rgba(68,48,79,.12)' },
      keyframes: { bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } }, rise: { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'none' } } },
      animation: { bob: 'bob 3s ease-in-out infinite', rise: 'rise .4s ease both' },
    },
  },
  plugins: [],
};
