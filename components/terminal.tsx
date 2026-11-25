import { deadlines } from '@/content/deadlines';
import { terminal } from '@/content/home';
import { longDate } from '@/lib/dates';

const dateFor = (symbol: string) =>
  longDate((deadlines.find((x) => x.symbol === symbol) ?? deadlines.find((x) => x.slug === 'shopify-offline-tokens')!).date);

// Pure CSS typing: the full text is in the HTML, and reduced motion shows it at once.
export function Terminal() {
  return (
    <figure className="flex min-w-0 flex-col bg-code text-code-ink" aria-label="Example scan output">
      <figcaption className="border-b border-white/10 px-5 py-3 font-mono text-xs text-code-dim">Terminal</figcaption>
      <div className="flex-1 p-5 font-mono text-xs">
        <p><span className="text-code-dim">$ </span><span className="type" style={{ ['--ch' as string]: terminal.command.length }}>{terminal.command}</span></p>
        <ul className="mt-4 space-y-3">
          {terminal.findings.map((f, i) => (
            <li key={f.at} className="line" style={{ animationDelay: `${1.4 + i * 0.35}s` }}>
              <p className="break-all">{f.at} <span className="text-code-warn">{f.symbol}</span></p>
              <p className="text-code-dim">{dateFor(f.symbol)}, {f.note}</p>
            </li>
          ))}
        </ul>
        <p className="line mt-4" style={{ animationDelay: `${1.4 + terminal.findings.length * 0.35}s` }}>{terminal.findings.length} findings<span className="caret" aria-hidden /></p>
      </div>
    </figure>
  );
}
