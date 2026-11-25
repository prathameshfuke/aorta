import type { Metadata } from 'next';
import { site } from '@/content/site';

export const ogName = (path: string) => `${path.replace(/^\//, '').replaceAll('/', '--') || 'home'}.png`;

export function pageMeta(path: string, title: string, description: string, absolute = false): Metadata {
  const full = absolute ? title : `${title} — Aorta`;
  const images = [{ url: `/og/${ogName(path)}`, width: 1200, height: 630, alt: full }];
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: site.company, title: full, description, url: path, images },
    twitter: { card: 'summary_large_image', title: full, description, images },
  };
}
