import Link from 'next/link';
import { PageHead, Wrap } from '@/components/ui';
import { longDate } from '@/lib/dates';
import { allPosts } from '@/lib/mdx';
import { pageMeta } from '@/lib/meta';

const intro = 'Notes on model migrations and what changes underneath production software.';
export const metadata = pageMeta('/blog', 'Blog', intro);

export default async function Blog() {
  const posts = await allPosts();
  return (
    <>
      <PageHead title="Blog." intro={intro} />
      <Wrap className="py-12 sm:py-16">
        <ul className="divide-y divide-line border-y border-line">
          {posts.map((p) => (
            <li key={p.slug} className="relative py-8">
              {p.meta.draft && <span className="badge mb-3 border-warn text-warn-text">Draft</span>}
              <h2 className="max-w-3xl text-balance text-h3"><Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 hover:underline">{p.meta.title}</Link></h2>
              <p className="mt-2 text-muted">{p.meta.description}</p>
              <p className="mt-3 text-sm text-muted">{p.meta.author}, <time dateTime={p.meta.date}>{longDate(p.meta.date!)}</time>, {p.minutes} min read</p>
            </li>
          ))}
        </ul>
      </Wrap>
    </>
  );
}
