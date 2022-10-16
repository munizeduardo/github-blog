/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    fontSize: {
      xs: '14px',
      sm: '16px',
      md: '18px',
      lg: '20px',
      xl: '24px',
      link: '12px',
    },
    colors: {
      black: '#000',
      white: '#FFF',

      base: {
        blue: '#3294F8',

        title: '#E7EDF4',
        subtitle: '#C4D4E3',
        text: '#AFC2D4',
        span: '#7B96B2',

        label: '#3A536B',
        border: '#1C2F41',

        post: '#112131',
        profile: '#0B1B2B',
        background: '#071422',

        input: '#040F1A',
      },
    },
    extend: {
      fontFamily: {
        sans: 'Nunito, sans-serif',
      },
    },
  },
  plugins: [],
}
