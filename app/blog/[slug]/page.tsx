import { notFound } from 'next/navigation';
import { Wrap } from '@/components/ui';
import { longDate } from '@/lib/dates';
import { allPosts } from '@/lib/mdx';
import { pageMeta } from '@/lib/meta';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = async () => (await allPosts()).map((p) => ({ slug: p.slug }));
const find = async ({ params }: Props) => {
  const { slug } = await params;
  return (await allPosts()).find((p) => p.slug === slug) ?? notFound();
};

export async function generateMetadata(props: Props) {
  const p = await find(props);
  return { ...pageMeta(`/blog/${p.slug}`, p.meta.title, p.meta.description), ...(p.meta.draft && { robots: { index: false } }) };
}

export default async function Post(props: Props) {
  const p = await find(props);
  return (
    <Wrap className="py-12 sm:py-20">
      <article className="mx-auto max-w-[46rem]">
        {p.meta.draft && <p className="mb-6 rounded border border-warn bg-surface px-4 py-3 text-sm font-medium text-warn-text">Draft. Not published research: no results yet.</p>}
        <h1 className="text-balance text-h2">{p.meta.title}</h1>
        <p className="mb-10 mt-5 text-sm text-muted">{p.meta.author}, <time dateTime={p.meta.date}>{longDate(p.meta.date!)}</time>, {p.minutes} min read</p>
        {p.content}
      </article>
    </Wrap>
  );
}
