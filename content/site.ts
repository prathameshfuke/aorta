// Replace every `.example` address and empty URL before launch.
export const site = {
  company: 'Aorta',
  product: 'Breakline',
  // Custom domain if set, else the Vercel production domain at build time.
  url: process.env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://aorta.example'),
  description: 'Breakline is a Claude skill that finds retiring model and API calls, plans the fix as a diff, and proves the replacement on your own saved prompts.',
  repoUrl: 'https://github.com/aorta-labs/breakline',
  installUrl: '/docs/skill',
  email: 'hello@aorta.example',
  securityEmail: 'security@aorta.example',
  location: 'Pune, India',
  // Footer shows these as "not yet live" while empty.
  social: { GitHub: 'https://github.com/aorta-labs/breakline', X: '', LinkedIn: '', Status: '' } as Record<string, string>,
};

export const nav = [
  { href: '/radar', label: 'Radar' },
  { href: '/docs', label: 'Docs' },
  { href: '/security', label: 'Security' },
  { href: '/blog', label: 'Blog' },
];

export const footer = [
  { title: 'Product', links: [{ href: '/radar', label: 'Retirement Radar' }, { href: '/blog', label: 'Blog' }, { href: '/about', label: 'About' }] },
  { title: 'Docs', links: [{ href: '/docs', label: 'Quickstart' }, { href: '/docs/skill', label: 'Install the skill' }, { href: '/docs/cli', label: 'Scripts' }, { href: '/docs/policy', label: 'Policy file' }, { href: '/docs/github-action', label: 'GitHub Action' }] },
  { title: 'Trust', links: [{ href: '/security', label: 'Security' }, { href: '/privacy', label: 'Privacy' }, { href: '/terms', label: 'Terms' }] },
];
