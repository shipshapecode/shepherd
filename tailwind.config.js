module.exports = {
  content: ['./index.html'],
  theme: {
    boxShadow: {
      default: '0 10px 30px 0 rgba(0, 0, 0, 1), 0 10px 20px 0 rgba(0, 0, 0, 1)'
    },

    colors: {
      transparent: 'transparent',

      black: '#000000',
      navy: '#16202D',
      'navy-light': '#959FAC',
      grey: '#F3F5F5',
      'grey-light': '#EFF2F3',
      white: '#FFFFFF'
    },

    fontFamily: {
      body: ['Founders Grotesk', 'sans-serif'],
      heading: ['GT Pressura', 'sans-serif']
    },

    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem'
    },

    maxWidth: {
      xxs: '13rem',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      '8xl': '90rem',
      '9xl': '100rem',
      full: '100%'
    },

    spacing: {
      px: '1px',
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      40: '10rem',
      48: '12rem',
      56: '14rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      140: '36rem'
    }
  },
  plugins: [],
  corePlugins: {
    container: false
  }
};
