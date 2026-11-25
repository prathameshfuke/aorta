import Link from 'next/link';
import type { ReactNode } from 'react';
import { site } from '@/content/site';
import { Github } from './icons';

export const Dot = ({ live = false }) => <span aria-hidden className={`dot ${live ? 'dot-live' : ''}`} />;

/** Renders the closing period in rose: the brand's break point. */
export function Title({ as: Tag = 'h2', text, className = '' }: { as?: 'h1' | 'h2'; text: string; className?: string }) {
  return (
    <Tag className={`text-balance ${Tag === 'h1' ? 'text-h1' : 'text-h2'} ${className}`}>
      {text.endsWith('.') ? <>{text.slice(0, -1)}<span className="text-brand">.</span></> : text}
    </Tag>
  );
}

export const Wrap = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-page px-gutter sm:px-8 ${className}`}>{children}</div>
);

export const Section = ({ children, id, className = '' }: { children: ReactNode; id?: string; className?: string }) => (
  <section id={id} className={`border-t border-line py-section ${className}`}><Wrap>{children}</Wrap></section>
);

export function PageHead({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) {
  return (
    <header className="relative border-b border-line">
      <div aria-hidden className="grid-bg grid-fade absolute inset-0" />
      <Wrap className="relative py-16 sm:py-24">
        <Title as="h1" text={title} className="max-w-4xl break-words" />
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>}
        {children}
      </Wrap>
    </header>
  );
}

export const Install = ({ variant = 'primary', className = '' }: { variant?: 'primary' | 'brand'; className?: string }) => (
  // Full class names, or Tailwind drops them from the build.
  <Link href={site.installUrl} className={`btn ${variant === 'brand' ? 'btn-brand' : 'btn-primary'} ${className}`}><Github />Install on GitHub</Link>
);

export const Unverified = () => <span className="badge border-warn text-warn-text">unverified</span>;

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map(({ q, a }) => (
        <details key={q} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-medium">
            {q}<span aria-hidden className="text-h3 !font-light text-muted transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-2xl pb-5 text-muted">{a}</p>
        </details>
      ))}
    </div>
  );
}
