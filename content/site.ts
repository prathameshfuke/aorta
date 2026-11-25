// Replace every `.example` address and empty URL before launch.
export const site = {
  company: 'Aorta',
  product: 'Breakline',
  // Custom domain if set, else the Vercel production domain at build time.
  url: process.env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://aorta.example'),
  description: 'Breakline finds every LLM and API call about to break, opens the fix as a pull request, and attaches a parity report from your own prompts.',
  // The GitHub App is not published yet, so both point at the install guide.
  installUrl: '/docs/install',
  signInUrl: '/docs/install',
  email: 'hello@aorta.example',
  securityEmail: 'security@aorta.example',
  location: 'Pune, India',
  // Footer shows these as "not yet live" while empty.
  social: { GitHub: '', X: '', LinkedIn: '', Status: '' } as Record<string, string>,
};

export const nav = [
  { href: '/radar', label: 'Radar' },
  { href: '/docs', label: 'Docs' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/security', label: 'Security' },
  { href: '/blog', label: 'Blog' },
];

export const footer = [
  { title: 'Product', links: [{ href: '/radar', label: 'Retirement Radar' }, { href: '/pricing', label: 'Pricing' }, { href: '/blog', label: 'Blog' }, { href: '/about', label: 'About' }] },
  { title: 'Docs', links: [{ href: '/docs', label: 'Quickstart' }, { href: '/docs/cli', label: 'CLI' }, { href: '/docs/policy', label: 'Policy file' }, { href: '/docs/github-action', label: 'GitHub Action' }] },
  { title: 'Trust', links: [{ href: '/security', label: 'Security' }, { href: '/privacy', label: 'Privacy' }, { href: '/terms', label: 'Terms' }] },
];
