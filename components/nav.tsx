'use client';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav, site } from '@/content/site';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { Install } from './ui';

export function Nav() {
  const path = usePathname();
  const links = nav.map((l) => (
    <Link key={l.href} href={l.href} aria-current={path.startsWith(l.href) ? 'page' : undefined} className="nav-link">{l.label}</Link>
  ));
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-page items-center gap-6 px-gutter sm:px-8">
        <Link href="/" className="flex h-11 shrink-0 items-center" aria-label="Aorta home"><Logo /></Link>
        <nav aria-label="Main" className="ml-4 hidden gap-1 lg:flex">{links}</nav>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <Link href={site.signInUrl} className="nav-link hidden lg:inline-flex">Sign in</Link>
          <Install className="ml-2 hidden sm:inline-flex" />
          {/* key closes the menu after navigation */}
          <details key={path} className="group lg:hidden">
            <summary className="icon-btn cursor-pointer list-none" aria-label="Menu">
              <Menu size={20} aria-hidden className="group-open:hidden" /><X size={20} aria-hidden className="hidden group-open:block" />
            </summary>
            <nav aria-label="Mobile" className="absolute inset-x-0 top-16 flex flex-col border-b border-line bg-bg px-gutter pb-4 pt-2">
              {links}
              <Link href={site.signInUrl} className="nav-link">Sign in</Link>
              <Install className="mt-3 sm:hidden" />
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
