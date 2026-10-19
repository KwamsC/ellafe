/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-inter)', 'monospace'],
        display: ['var(--font-italiana)', 'serif'],
        control: ['var(--font-instrument)', 'sans-serif'],
        italiana: ['var(--font-italiana)', 'serif'],
      },
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        background: 'var(--background)',
        border: 'var(--border)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        foreground: 'var(--foreground)',
        input: 'var(--input)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          hover: 'var(--primary-hover)',
          pressed: 'var(--primary-pressed)',
        },
        ring: 'var(--ring)',
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
          border: 'var(--secondary-border)',
          hover: 'var(--secondary-hover)',
        },
        success: 'var(--success)',
        error: 'var(--error)',
        warning: 'var(--warning)',
        espresso: '#482d10',
        roast: '#35210c',
        bronze: '#94734d',
        ink: '#241e18',
        paper: '#f8f6f2',
        linen: '#ede7df',
        mist: '#e4e4e4',
        night: '#211a14',
        raised: '#30271f',
        inverse: '#857565',
        'inverse-muted': '#c4b7a8',
        subtle: '#cfc5b9',
        disabled: '#77716b',
        field: {
          DEFAULT: 'var(--field)',
          border: 'var(--field-border)',
          foreground: 'var(--field-foreground)',
          hint: 'var(--field-hint)',
        },
        tertiary: {
          foreground: 'var(--tertiary-foreground)',
          hover: 'var(--tertiary-hover)',
        },
        link: 'var(--link)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        in: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        out: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-to-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-to-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 },
        },
      },
      animation: {
        in: 'in 0.2s ease-out',
        out: 'out 0.2s ease-out',
        fadeIn: 'fadeIn .3s ease-in-out',
        fadeOut: 'fadeOut .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        'slide-in-from-left': 'slide-in-from-left 0.2s ease-out',
        'slide-out-to-left': 'slide-out-to-left 0.2s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.2s ease-out',
        'slide-out-to-right': 'slide-out-to-right 0.2s ease-out',
        blink: 'blink 1.4s both infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--foreground)',
              '--tw-prose-headings': 'var(--foreground)',
              '--tw-prose-bold': 'var(--foreground)',
              '--tw-prose-links': 'var(--link)',
              h1: {
                fontFamily: 'var(--font-italiana)',
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
              h2: {
                fontFamily: 'var(--font-italiana)',
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
              h3: {
                fontFamily: 'var(--font-italiana)',
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
              h4: {
                fontFamily: 'var(--font-italiana)',
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
