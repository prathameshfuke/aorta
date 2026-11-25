import type { Config } from 'tailwindcss';
import { colors, fontSize, radius, space } from './content/tokens';

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,mdx}', './lib/**/*.{ts,tsx}'],
  theme: {
    // Only token colours exist, so an off-palette class fails loudly.
    colors: { transparent: 'transparent', current: 'currentColor', white: '#FFFFFF', ...Object.fromEntries(Object.keys(colors).map((n) => [n, v(n)])) },
    fontSize,
    extend: {
      fontFamily: { sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'], mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'] },
      borderRadius: radius,
      spacing: space,
      maxWidth: { page: '72rem' },
    },
  },
} satisfies Config;
