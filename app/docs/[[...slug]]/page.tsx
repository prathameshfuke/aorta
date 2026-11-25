import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DocsNav } from '@/components/docs-nav';
import { Wrap } from '@/components/ui';
import { docs } from '@/content/docs';
import { loadMdx } from '@/lib/mdx';
import { pageMeta } from '@/lib/meta';

type Props = { params: Promise<{ slug?: string[] }> };
export const dynamicParams = false;
export const generateStaticParams = () => docs.map((d) => ({ slug: d.slug === 'quickstart' ? [] : [d.slug] }));

const href = (slug: string) => (slug === 'quickstart' ? '/docs' : `/docs/${slug}`);
const index = async ({ params }: Props) => {
  const slug = (await params).slug?.join('/') ?? 'quickstart';
  const i = docs.findIndex((d) => d.slug === slug);
  return i < 0 ? notFound() : i;
};

export async function generateMetadata(props: Props) {
  const d = docs[await index(props)];
  const { meta } = await loadMdx('docs', d.slug);
  return pageMeta(href(d.slug), `${meta.title} · Docs`, meta.description);
}

export default async function Doc(props: Props) {
  const i = await index(props);
  const { content, meta } = await loadMdx('docs', docs[i].slug);
  const next = docs[i + 1];
  return (
    <Wrap className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 lg:py-14">
      <div className="lg:sticky lg:top-24 lg:self-start"><DocsNav /></div>
      <article className="min-w-0">
        <h1 className="break-words text-h2">{meta.title}</h1>
        <p className="mb-10 mt-3 text-lg text-muted">{meta.description}</p>
        {content}
        {next && <p className="mt-14 max-w-[46rem] border-t border-line pt-5"><Link href={href(next.slug)} className="link inline-flex min-h-11 items-center">Next: {next.title}</Link></p>}
      </article>
    </Wrap>
  );
}
