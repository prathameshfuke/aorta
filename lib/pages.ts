import { deadlines } from '@/content/deadlines';
import { docs } from '@/content/docs';
import { hero } from '@/content/home';
import { longDate } from './dates';
import { allPosts } from './mdx';

/** Every page, used by the sitemap and the OG image route. `hidden` pages are noindex. */
export async function pages(): Promise<{ path: string; title: string; hidden?: boolean }[]> {
  return [
    { path: '/', title: hero.title },
    { path: '/radar', title: 'Retirement Radar' },
    { path: '/radar/scan', title: 'Scan a public repo', hidden: true },
    ...deadlines.map((d) => ({ path: `/radar/${d.slug}`, title: `${d.symbol} retires ${longDate(d.date)}` })),
    { path: '/pricing', title: 'Pricing' },
    { path: '/security', title: 'Security' },
    ...docs.map((d) => ({ path: d.slug === 'quickstart' ? '/docs' : `/docs/${d.slug}`, title: `Docs: ${d.title}` })),
    { path: '/blog', title: 'Blog' },
    ...(await allPosts()).map((p) => ({ path: `/blog/${p.slug}`, title: p.meta.draft ? `Draft: ${p.meta.title}` : p.meta.title, hidden: p.meta.draft })),
    { path: '/about', title: 'About Aorta' },
    { path: '/privacy', title: 'Privacy policy' },
    { path: '/terms', title: 'Terms of service' },
    { path: '/styleguide', title: 'Styleguide', hidden: true },
  ];
}
