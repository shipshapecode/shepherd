/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  content: [
    'src/**/*.{js,ts,jsx,tsx,mdx}',
    '../node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        navy: '#16202D',
        'navy-light': '#959FAC',
        white: '#FFFFFF',
        black: '#111111',
        violet: {
          100: '#A5B4FB',
          200: '#A8A6FF',
          300: '#918efa',
          400: '#807dfa',
        },
        pink: {
          200: '#FFA6F6',
          300: '#fa8cef',
          400: '#fa7fee',
        },
        red: {
          200: '#FF9F9F',
          300: '#fa7a7a',
          400: '#f76363',
        },
        orange: {
          200: '#FFC29F',
          300: '#FF965B',
          400: '#fa8543',
        },
        yellow: {
          200: '#FFF59F',
          300: '#FFF066',
          400: '#FFE500',
        },
        lime: {
          100: '#c6fab4',
          200: '#B8FF9F',
          300: '#9dfc7c',
          400: '#7df752',
        },
        cyan: {
          200: '#A6FAFF',
          300: '#79F7FF',
          400: '#53f2fc',
        },
        shepherd: {
          DEFAULT: 'hsl(var(--color-shepherd))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // light mode
        tremor: {
          brand: {
            faint: '#eff6ff', // blue-50
            muted: '#bfdbfe', // blue-200
            subtle: '#60a5fa', // blue-400
            DEFAULT: '#3b82f6', // blue-500
            emphasis: '#1d4ed8', // blue-700
            inverted: '#ffffff', // white
          },
          background: {
            muted: '#f9fafb', // gray-50
            subtle: '#f3f4f6', // gray-100
            DEFAULT: '#ffffff', // white
            emphasis: '#374151', // gray-700
          },
          border: {
            DEFAULT: '#000000',
          },
          ring: {
            DEFAULT: '#000000',
          },

          content: {
            subtle: '#9ca3af', // gray-400
            DEFAULT: '#6b7280', // gray-500
            emphasis: '#374151', // gray-700
            strong: '#111827', // gray-900
            inverted: '#ffffff', // white
          },
        },
        // dark mode
        'dark-tremor': {
          brand: {
            faint: '#0B1229', // custom
            muted: '#172554', // blue-950
            subtle: '#1e40af', // blue-800
            DEFAULT: '#3b82f6', // blue-500
            emphasis: '#60a5fa', // blue-400
            inverted: '#030712', // gray-950
          },
          background: {
            muted: '#131A2B', // custom
            subtle: '#1f2937', // gray-800
            DEFAULT: '#111827', // gray-900
            emphasis: '#d1d5db', // gray-300
          },
          border: {
            DEFAULT: '#1f2937', // gray-800
          },
          ring: {
            DEFAULT: '#1f2937', // gray-800
          },
          content: {
            subtle: '#4b5563', // gray-600
            DEFAULT: '#6b7280', // gray-600
            emphasis: '#e5e7eb', // gray-200
            strong: '#f9fafb', // gray-50
            inverted: '#000000', // black
          },
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
        'tremor-small': 'var(--radius)',
        'tremor-default': 'var(--radius)',
        'tremor-full': '9999px',
      },
      boxShadow: {
        default: 'var(--neo-shadow)',
        dropdown: '0px 2px 6px -1px rgba(0, 0, 0, 0.08)',
        // light
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card':
          '4px 4px 0px 0px rgba(0,0,0,1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        // dark
        'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'dark-tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'dark-tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      fontFamily: {
        body: ['Founders Grotesk', ...fontFamily.sans], //TODO: Fix Founders Grotesk line height issues
        // body: [...fontFamily.sans],
        heading: ['GT Pressura', ...fontFamily.sans],
        mono: ['var(--font-firamono)', ...fontFamily.serif],
        sans: [...fontFamily.sans],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
      },
      // fontSize: {
      //   xs: '0.75rem',
      //   sm: '0.875rem',
      //   base: '1rem',
      //   lg: '1.125rem',
      //   xl: '1.25rem',
      //   '2xl': '1.5rem',
      //   '3xl': '1.875rem',
      //   '4xl': '2.25rem',
      //   '5xl': '3rem',
      //   '6xl': '4rem',
      //   'tremor-label': ['0.75rem'],
      //   'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
      //   'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
      //   'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
      // },
      // keyframes: {
      //   'accordion-down': {
      //     from: { height: 0 },
      //     to: { height: 'var(--radix-accordion-content-height)' },
      //   },
      //   'accordion-up': {
      //     from: { height: 'var(--radix-accordion-content-height)' },
      //     to: { height: 0 },
      //   },
      //   'fade-in-up': {
      //     from: { opacity: 0, transform: 'translateY(10px)' },
      //     to: { opacity: 1, transform: 'none' },
      //   },
      //   spinning: {
      //     '100%': { transform: 'rotate(360deg)' },
      //   },
      // },
      // animation: {
      //   'accordion-down': 'accordion-down 0.2s ease-out',
      //   'accordion-up': 'accordion-up 0.2s ease-out',
      //   'fade-in-up':
      //     'fade-in-up 600ms var(--animation-delay, 0ms) cubic-bezier(.21,1.02,.73,1) forwards',
      //   'fade-in-bottom':
      //     'fade-in-bottom cubic-bezier(.21,1.02,.73,1) forwards',
      //   spinning: 'spinning 0.75s linear infinite',
      // },
      // textColor: {
      //   emphasis: 'var(--cal-text-emphasis, #111827)',
      //   default: 'var(--cal-text, #374151)',
      //   subtle: 'var(--cal-text-subtle, #6B7280)',
      //   muted: 'var(--cal-text-muted, #9CA3AF)',
      //   inverted: 'var(--cal-text-inverted, white)',
      //   info: 'var(--cal-text-info, #253985)',
      //   success: 'var(--cal-text-success, #285231)',
      //   attention: 'var(--cal-text-attention, #73321B)',
      //   error: 'var(--cal-text-error, #752522)',
      //   brand: "var(--cal-brand-text,'white')",
      // },

      // screens: {
      //   pwa: { raw: '(display-mode: standalone)' },
      // },
      // borderWidth: {
      //   'booker-width': 'var(--cal-border-booker-width, 1px)',
      // },
      // maxHeight: (theme) => ({
      //   0: '0',
      //   97: '25rem',
      //   ...theme('spacing'),
      //   full: '100%',
      //   screen: '100vh',
      // }),
      // minHeight: (theme) => ({
      //   0: '0',
      //   ...theme('spacing'),
      //   full: '100%',
      //   screen: '100vh',
      // }),
      // minWidth: (theme) => ({
      //   0: '0',
      //   ...theme('spacing'),
      //   full: '100%',
      //   screen: '100vw',
      // }),
      // maxWidth: (theme, { breakpoints }) => ({
      //   0: '0',
      //   ...theme('spacing'),
      //   ...breakpoints(theme('screens')),
      //   full: '100%',
      //   screen: '100vw',
      // }),
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(45deg,magenta,rebeccapurple,dodgerblue,green)',
        'gradient-secondary':
          'radial-gradient(rgba(68,91,222,1) 0%, rgba(215,78,243,1) 25%, rgba(255,255,255,1) 50%)',
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
        '6xl': '4rem',
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
        full: '100%',
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
        140: '36rem',
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/typography'),
  ],
  corePlugins: {
    container: false,
  },
};

export default config;
