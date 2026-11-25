'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docs } from '@/content/docs';

export function DocsNav() {
  const path = usePathname().replace(/\/$/, '');
  const current = docs.find((d) => path.endsWith(`/${d.slug}`)) ?? docs[0];
  const list = (
    <ul>{docs.map((d) => (
      <li key={d.slug}>
        <Link href={d.slug === 'quickstart' ? '/docs' : `/docs/${d.slug}`} aria-current={d === current ? 'page' : undefined}
          className="flex min-h-11 items-center rounded px-3 text-sm text-muted hover:text-ink aria-[current=page]:bg-subtle aria-[current=page]:font-medium aria-[current=page]:text-ink">{d.title}</Link>
      </li>
    ))}</ul>
  );
  return (
    <nav aria-label="Documentation sections">
      <details key={path} className="rounded border border-line bg-surface lg:hidden">
        <summary className="flex min-h-11 cursor-pointer items-center px-3 text-sm font-medium">Docs: {current.title}</summary>
        <div className="border-t border-line p-1">{list}</div>
      </details>
      <div className="hidden lg:block">{list}</div>
    </nav>
  );
}
