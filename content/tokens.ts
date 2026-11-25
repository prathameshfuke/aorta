// Design tokens. Edit here; tailwind.config.ts, globals (via layout) and /styleguide all read this file.
// Colours are "R G B" so Tailwind opacity modifiers work.
export const colors = {
  bg:        { light: '250 250 250', dark: '10 10 10',    use: 'Page background' },
  surface:   { light: '255 255 255', dark: '18 18 18',    use: 'Cards and windows' },
  subtle:    { light: '244 244 245', dark: '26 26 27',    use: 'Insets, table heads' },
  line:      { light: '228 228 231', dark: '39 39 42',    use: '1px borders' },
  control:   { light: '133 133 142', dark: '113 113 122', use: 'Input borders (3:1)' },
  ink:       { light: '17 17 17',    dark: '244 244 245', use: 'Text' },
  muted:     { light: '82 82 91',    dark: '161 161 170', use: 'Secondary text' },
  brand:     { light: '225 29 72',   dark: '225 29 72',   use: 'Rose dot, one CTA. Never for errors' },
  'brand-text': { light: '200 16 60', dark: '251 113 133', use: 'Days-left numbers' },
  warn:      { light: '217 119 6',   dark: '217 119 6',   use: 'Amber fills and icons: FAIL, alerts' },
  'warn-text': { light: '146 64 14', dark: '251 191 36',  use: 'Amber text' },
  pass:      { light: '45 112 76',   dark: '116 190 145', use: 'PASS' },
  code:      { light: '16 16 18',    dark: '5 5 5',       use: 'Terminal ground (dark in both themes)' },
  'code-ink': { light: '228 228 231', dark: '228 228 231', use: 'Terminal text' },
  'code-dim': { light: '148 148 158', dark: '148 148 158', use: 'Terminal secondary' },
  'code-warn': { light: '251 191 36', dark: '251 191 36', use: 'Terminal warnings' },
};

type Size = [string, { lineHeight: string; letterSpacing?: string; fontWeight?: string }];
export const fontSize: Record<string, Size> = {
  xs:      ['0.8125rem', { lineHeight: '1.25rem' }],
  sm:      ['0.9375rem', { lineHeight: '1.5rem' }],
  base:    ['1.0625rem', { lineHeight: '1.75rem' }],
  lg:      ['1.1875rem', { lineHeight: '1.9rem' }],
  h3:      ['1.375rem',  { lineHeight: '1.75rem', letterSpacing: '-0.02em', fontWeight: '600' }],
  h2:      ['clamp(1.875rem, 1.2rem + 2.4vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.035em', fontWeight: '600' }],
  h1:      ['clamp(2.375rem, 1.1rem + 4.4vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.045em', fontWeight: '600' }],
};

export const radius = { DEFAULT: '0.75rem', lg: '1rem' }; // 12px, 16px
export const space = { gutter: '1rem', section: 'clamp(4.5rem, 3rem + 6vw, 8rem)' };
