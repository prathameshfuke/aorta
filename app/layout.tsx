import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { Nav } from '@/components/nav';
import { Reveal } from '@/components/reveal';
import { site } from '@/content/site';
import { colors } from '@/content/tokens';
import { pageMeta } from '@/lib/meta';
import './globals.css';

export const metadata: Metadata = { metadataBase: new URL(site.url), ...pageMeta('/', 'Aorta Breakline — prove your model migration works', site.description, true) };

const vars = (mode: 'light' | 'dark') => Object.entries(colors).map(([n, c]) => `--${n}:${c[mode]}`).join(';');
const theme = `:root{${vars('light')}}:root[data-theme="dark"]{${vars('dark')}}@media(prefers-color-scheme:dark){:root:not([data-theme]){${vars('dark')}}}`;
// Runs before paint: no theme flash, and enables scroll reveals.
const boot = `(function(d){d.classList.add('js');var t;try{t=localStorage.getItem('theme')}catch(e){}d.dataset.theme=t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')})(document.documentElement)`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: theme }} />
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a href="#main" className="btn btn-primary sr-only z-50 focus:not-sr-only focus:!fixed focus:left-3 focus:top-3">Skip to content</a>
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
        <Reveal />
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Organization', name: site.company, url: site.url, logo: `${site.url}/brand/logo-light-bg.svg`, email: site.email, address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' } }} />
      </body>
    </html>
  );
}
