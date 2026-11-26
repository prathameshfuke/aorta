/* eslint-disable @next/next/no-img-element */
// Drawn by breakline/skill/docs/make_diagrams.py, the same files the skill README uses.
const heights = { workflow: 580, boundary: 560, policy: 362, verdict: 610 };
const alts = {
  workflow: 'Eight steps: preflight, check dates, scan, you choose replacements, plan, prove, you approve, apply and report. A parity failure returns to planning.',
  boundary: 'The Claude model receives the files Claude opens and script output. The compared models receive fixture prompts only in live parity. Provider pages are fetched to confirm dates. API keys are read from your environment.',
  policy: 'A call site takes the first matching policy rule: allow, ask or deny. With no matching rule it is ask.',
  verdict: 'Six checks produce fail, warn or pass. Ready for review needs a live pass for every replaced model with the patch applied.',
};

export function Diagram({ name, className = '' }: { name: keyof typeof heights; className?: string }) {
  const img = (theme: string, cls: string) => (
    <img src={`/diagrams/${name}-${theme}.svg`} alt={alts[name]} width={480} height={heights[name]} loading="lazy" className={`h-auto w-full ${cls}`} />
  );
  return (
    <div className={`mx-auto w-full max-w-[30rem] overflow-hidden rounded-lg border border-line ${className}`}>
      {img('light', 'block dark:hidden')}{img('dark', 'hidden dark:block')}
    </div>
  );
}
