/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      fontSize:{
        'display-1': 'calc(1.3rem + 6.7vw)',
        'headline-1': 'calc(2rem + 2.5vw)',
        'headline-2': 'calc(1.3rem + 2.4vw)',
        'title-1': ' calc(1.6rem + 1.2vw)'
      },
      fontFamily:{
        'poppins':  ["Poppins", 'sans-serif']
      },
      colors:{
        'gray-1': '#272829',
        'gray-2': '#61677A',
        'gray-3': '#D8D9DA',
        'gray-4': '#FFF6E0',
        'blue-1': '#070F2B',
        'blue-2': '#1B1A55',
        'blue-3': '#535C91',
        'blue-4': '#9290C3',
        'gold-1': '#ED9455',
        'gold-2': '#FFBB70',
        'gold-3': '#FFEC9E',
        'gold-4': '#FFFBDA',
        'brown-1': '#6B240C',
        'brown-2': '#994D1C',
        'brown-3': '#E48F45',
        'brown-4': '#F5CCA0'
      }
    }
  }
}

