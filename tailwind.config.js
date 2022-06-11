module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0099ff',
        secondary: '#1c5480',
        '000': '#000000',
        fff: '#ffffff'
      },
      width: {
        xsm: '1000px'
      },
      height: {
        '90vh': '90vh'
      },
      screens: {
        mobile: '724px'
      }
    }
  },
  plugins: []
}
