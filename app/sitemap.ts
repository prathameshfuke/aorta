import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { pages } from '@/lib/pages';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return (await pages()).filter((p) => !p.hidden).map((p) => ({ url: new URL(p.path, site.url).toString() }));
}
