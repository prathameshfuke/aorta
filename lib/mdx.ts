import fs from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/mdx';

export type Front = { title: string; description: string; author?: string; date?: string; draft?: boolean };

const dir = (kind: 'docs' | 'blog') => path.join(process.cwd(), 'content', kind);

export async function loadMdx(kind: 'docs' | 'blog', slug: string) {
  const source = fs.readFileSync(path.join(dir(kind), `${slug}.mdx`), 'utf8');
  const { content, frontmatter } = await compileMDX<Front>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: { light: 'github-light-high-contrast', dark: 'github-dark-high-contrast' }, keepBackground: false, defaultLang: 'text' }]],
      },
    },
  });
  const words = source.replace(/^---[\s\S]*?---/, '').split(/\s+/).filter(Boolean).length;
  return { content: createElement('div', { className: 'prose' }, content), meta: frontmatter, minutes: Math.max(1, Math.round(words / 220)) };
}

export const allPosts = async () =>
  (await Promise.all(
    fs.readdirSync(dir('blog')).filter((f) => f.endsWith('.mdx')).map(async (f) => {
      const slug = f.slice(0, -4);
      return { slug, ...(await loadMdx('blog', slug)) };
    }),
  )).sort((a, b) => (b.meta.date ?? '').localeCompare(a.meta.date ?? ''));
