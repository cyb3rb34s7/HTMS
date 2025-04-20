module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2563EB',
        'deep-navy': '#1E40AF',
        'light-blue': '#DBEAFE',
        'success-green': '#10B981',
        'warning-amber': '#F59E0B',
        'error-red': '#EF4444',
        'purple': '#8B5CF6',
        'light-purple': '#EDE9FE',
        'dark-gray': '#1F2937',
        'medium-gray': '#6B7280',
        'light-gray': '#E5E7EB',
        'off-white': '#F9FAFB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
