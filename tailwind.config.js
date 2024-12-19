/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: ' #FD7657',
        'border-gray': '#25252514',

        'light-gray': '#F5F5F6',
        gradient: 'linearGradient(107.77deg, #FD8064 12.14%, #FEA793 79.99%)',
        'primary-text': '#252525',
        'secondary-text': '#666666',
        dark: '#252525',
        'dark-1': '#333333',
        'dark-2': '#666666',
        'dark-3': '#7B7B7B',
        'dark-4': '#828282',
        'dark-5': '#9B9B9B',
        'dark-6': '#A3A3A3',
        'dark-7': '#AEAEAE',
        'gray-1': '#F5F5F5',
        'gray-2': '#F1F1F2',
        'gray-3': '#EBEBEB',
        green: '#3ACC48',
        'green-light': '#3ACC481A',
        blue: '#3A51CC',
        'blue-light': '#3A51CC1A',
        red: '#F14445',
        'red-light': '#F144451A',
        yellow: '#F0C045',
      },
      backgroundImage: {
        'linear-gradient': "url('/src/assets/images/linear_bg.jpg')",
      },
      fontFamily: {
        regular: ['Regular'],
      },
      screens: {
        xs: '0px',
      },
    },
  },
  plugins: [],
};
