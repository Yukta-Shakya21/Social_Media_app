/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        'primary-text': 'rgb(var(--color-primary-text) / <alpha-value>)',
        'secondary-text': 'rgb(var(--color-secondary-text) / <alpha-value>)',
        'button-bg': 'rgb(var(--color-button-bg) / <alpha-value>)',
        'button-text': 'rgb(var(--color-button-text) / <alpha-value>)',
        'link-text': 'rgb(var(--color-link-text) / <alpha-value>)',
        'input-bg': 'rgb(var(--color-input-bg) / <alpha-value>)',
        'placeholder-text':
          'rgb(var(--color-placeholder-text) / <alpha-value>)',
        'item-bg': 'rgb(var(--color-item-bg) / <alpha-value>)',
        icon: 'rgb(var(--color-icon) / <alpha-value>)',
        'popular-token-bg':
          'rgb(var(--color-popular-token-bg) / <alpha-value>)',
        'skip-button': 'rgb(var(--color-skip-button) / <alpha-value>)', // New skip button color
        'warning-bg': 'rgb(var(--color-warning-bg) / <alpha-value>)',
        'warning-text': 'rgb(var(--color-warning-text) / <alpha-value>)',
      },
    },
  },
  plugins: [
    ({addBase}) =>
      addBase({
        ':root': {
          '--color-background': '255 255 255', // Default to white
          '--color-primary-text': '0 0 0', // Default to black
          '--color-secondary-text': '107 114 128', // Default to gray
          '--color-button-bg': '243 244 246', // Light gray button background
          '--color-button-text': '0 0 0', // Black text for buttons
          '--color-link-text': '37 99 235', // Blue text for links
          '--color-input-bg': '229 231 235', // Light gray for inputs
          '--color-placeholder-text': '163 163 163', // Light gray for placeholders
          '--color-item-bg': '255 255 255', // Light gray for list items
          '--color-icon': '6 2 245', // Default to your icon color
          '--color-popular-token-bg': '243 244 246', // Light gray background for tokens
        },
        '.dark': {
          '--color-background': '18 18 18', // Dark background
          '--color-primary-text': '255 255 255', // White text
          '--color-secondary-text': '156 163 175', // Lighter gray text
          '--color-button-bg': '37 37 37', // Dark gray button background
          '--color-button-text': '255 255 255', // White text for buttons
          '--color-link-text': '59 130 246', // Blue text for links in dark mode
          '--color-input-bg': '55 65 81', // Darker gray for inputs
          '--color-placeholder-text': '107 114 128', // Medium gray for placeholders
          '--color-item-bg': '37 37 37', // Dark gray for list items
          '--color-icon': '6 2 245', // Default to your icon color
          '--color-popular-token-bg': '243 244 246', // Light gray background for tokens
        },
      }),
  ],
  darkMode: 'class', // Enable class-based dark mode
};
