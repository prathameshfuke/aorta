import { Check, GitPullRequestDraft, Minus, X } from 'lucide-react';
import { proof } from '@/content/home';
import { Dot } from './ui';

const kinds = { pass: [Check, 'PASS', 'text-pass'], fail: [X, 'FAIL', 'text-warn-text'], info: [Minus, 'INFO', 'text-muted'] } as const;

const Status = ({ s }: { s: keyof typeof kinds }) => {
  const [Icon, label, cls] = kinds[s];
  return <span className={`inline-flex items-center gap-1 font-mono text-xs font-semibold ${cls}`}><Icon size={14} aria-hidden />{label}</span>;
};

const Bot = () => (
  <p className="flex flex-wrap items-center gap-2 text-sm">
    <span className="grid size-7 place-items-center rounded-full border border-line bg-surface"><Dot /></span>
    <strong className="font-semibold">breakline</strong><span className="badge border-line text-muted">bot</span><span className="text-muted">commented</span>
  </p>
);

/** Compact card for the hero. */
export function PrCard() {
  return (
    <div className="flex min-w-0 flex-col bg-surface">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3 text-sm">
        <GitPullRequestDraft size={16} aria-hidden className="shrink-0 text-muted" />
        <span className="font-medium">Breakline: migrate retiring models</span>
        <span className="badge ml-auto border-line text-muted">Draft</span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="overflow-hidden rounded border border-line font-mono text-xs">
          <p className="border-b border-line bg-subtle px-3 py-1.5 text-muted">app/triage.py</p>
          <p className="break-all bg-warn/10 px-3 py-0.5">- model=&quot;gpt-4o-2024-08-06&quot;,</p>
          <p className="break-all bg-pass/10 px-3 py-0.5">+ model=&quot;gpt-5.4-mini&quot;,</p>
        </div>
        <Bot />
        <div className="rounded border border-warn bg-warn/10 p-4">
          <p className="flex items-center justify-between gap-3 text-sm font-semibold">Parity report<Status s="fail" /></p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            {proof.rows.slice(0, 2).map((r) => (
              <div key={r.check}><dt>{r.check}</dt><dd className="font-mono text-h3 text-warn-text">{r.result}</dd><dd className="text-xs">needs {r.threshold}</dd></div>
            ))}
          </dl>
        </div>
        <p className="text-sm text-muted">The pull request stays in draft until parity passes.</p>
      </div>
    </div>
  );
}

/** Full report for the proof section. */
export function ParityComment() {
  return (
    <figure data-reveal className="min-w-0">
      <div className="shadow-window overflow-hidden rounded-lg border border-line bg-surface">
        <div className="border-b border-line bg-subtle px-4 py-3 sm:px-6"><Bot /></div>
        <div className="p-4 sm:p-6">
          <h3 className="break-words font-mono text-base font-semibold">{proof.title}</h3>
          <table className="mt-5 w-full text-left text-sm">
            <thead className="border-b border-line text-muted">
              <tr><th scope="col" className="py-2 pl-2 font-medium">Check</th><th scope="col" className="px-2 py-2 font-medium">Result</th><th scope="col" className="hidden py-2 font-medium sm:table-cell">Threshold</th><th scope="col" className="py-2 pr-2 text-right font-medium">Status</th></tr>
            </thead>
            <tbody>
              {proof.rows.map((r, i) => (
                <tr key={r.check} className={`row border-b border-line ${r.status === 'fail' ? 'bg-warn/10' : ''}`} style={{ ['--i' as string]: i }}>
                  <th scope="row" className="py-3 pl-2 pr-1 font-medium">{r.check}<span className="block text-xs font-normal sm:hidden">{r.threshold}</span></th>
                  <td className="px-2 py-3 font-mono">{r.result}</td>
                  <td className="hidden py-3 font-mono sm:table-cell">{r.threshold}</td>
                  <td className="py-3 pr-2 text-right"><Status s={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="mt-6 text-sm font-semibold">Regressions</h4>
          <ul className="mt-2 space-y-2">
            {proof.regressions.map((r, i) => (
              <li key={r.id} className="row flex gap-3 rounded border border-line px-3 py-2 font-mono text-xs" style={{ ['--i' as string]: i + proof.rows.length }}>
                <span className="font-semibold text-warn-text">{r.id}</span><span className="min-w-0 break-words">{r.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-muted">{proof.caption}</figcaption>
    </figure>
  );
}
