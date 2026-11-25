import { Dot, Install, PageHead, Section, Title, Unverified } from '@/components/ui';
import { colors, fontSize, radius, space } from '@/content/tokens';
import { pageMeta } from '@/lib/meta';

export const metadata = { ...pageMeta('/styleguide', 'Styleguide', 'Aorta design tokens.'), robots: { index: false } };

export default function Styleguide() {
  return (
    <>
      <PageHead title="Styleguide." intro="Tokens come from content/tokens.ts, which tailwind.config.ts reads." />
      <Section>
        <Title text="Colour." />
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(colors).map(([name, c]) => (
            <li key={name} className="rounded-lg border border-line bg-surface p-3">
              <div className="grid grid-cols-2 overflow-hidden rounded border border-line">
                <span className="h-16" style={{ background: `rgb(${c.light})` }} /><span className="h-16" style={{ background: `rgb(${c.dark})` }} />
              </div>
              <p className="mt-3 font-mono text-sm font-medium">{name}</p>
              <p className="text-xs text-muted">light {c.light} / dark {c.dark}</p>
              <p className="mt-1 text-sm">{c.use}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <Title text="Type." />
        <ul className="mt-8 divide-y divide-line">
          {Object.entries(fontSize).reverse().map(([name, [size, o]]) => (
            <li key={name} className="py-5">
              <p style={{ fontSize: size, ...o }}>Ship the migration</p>
              <p className="mt-1 break-words font-mono text-xs text-muted">{name}: {size} / {o.lineHeight}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono">Geist Mono: gpt-4o-2024-08-06 0123456789</p>
      </Section>
      <Section>
        <Title text="Radius and spacing." />
        <div className="mt-8 flex flex-wrap gap-6">{Object.entries(radius).map(([n, v]) => <div key={n} className="grid h-24 w-40 place-items-center border border-control font-mono text-xs" style={{ borderRadius: v }}>{n}: {v}</div>)}</div>
        <ul className="mt-6 break-words font-mono text-sm">{Object.entries(space).map(([n, v]) => <li key={n}>{n}: {v}</li>)}</ul>
        <p className="mt-3 text-sm text-muted">All other spacing uses the Tailwind 4px scale.</p>
      </Section>
      <Section>
        <Title text="Components." />
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Install /><Install variant="brand" /><button type="button" className="btn btn-quiet">Quiet</button>
          <Dot live /><Unverified /><span className="badge border-pass text-pass">PASS</span><span className="badge border-warn text-warn-text">FAIL</span>
        </div>
      </Section>
    </>
  );
}
