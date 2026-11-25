import Link from 'next/link';
import { footer, site } from '@/content/site';
import { Logo } from './logo';
import { Wrap } from './ui';

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface py-16">
      <Wrap>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">Breakline keeps model and API migrations from breaking production.</p>
            <a href={`mailto:${site.email}`} className="link mt-3 inline-flex min-h-11 items-center text-sm">{site.email}</a>
          </div>
          {footer.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-2">{col.links.map((l) => <li key={l.href}><Link href={l.href} className="foot-link">{l.label}</Link></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>Made in {site.location}</p>
          <ul className="flex flex-wrap gap-x-6">
            {Object.entries(site.social).map(([name, url]) => (
              <li key={name}>{url ? <a href={url} className="foot-link">{name}</a> : <span className="inline-flex min-h-11 items-center">{name} (not live yet)</span>}</li>
            ))}
          </ul>
        </div>
      </Wrap>
    </footer>
  );
}
