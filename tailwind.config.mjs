/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-mulish)', 'sans-serif'],
        mono: ['var(--font-inter)', 'monospace'],
        italiana: ['var(--font-italiana)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
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
