// Portrait viewBox so the labels stay readable on a 360px screen.
const steps = ['Scanner', 'Policy', 'Codemod', 'Parity', 'Pull request'];

export function DataFlow() {
  return (
    <svg viewBox="0 0 360 560" role="img" aria-labelledby="flow-title flow-desc" className="mx-auto h-auto w-full max-w-md font-sans">
      <title id="flow-title">Breakline data flow</title>
      <desc id="flow-desc">The Breakline service holds only the change registry and sends it down to your GitHub runner. On the runner, the scanner, policy, codemod, parity check and pull request steps run in order. Keys and prompts stay on the runner.</desc>
      <rect x="40" y="1" width="280" height="76" rx="14" className="fill-surface stroke-line" />
      <text x="180" y="34" textAnchor="middle" fontSize="15" fontWeight="600" className="fill-ink">Breakline service</text>
      <text x="180" y="56" textAnchor="middle" fontSize="13" className="fill-muted">change registry only</text>
      <path d="M180 77V138m-6-8 6 8 6-8" fill="none" strokeWidth="1.5" className="stroke-control" />
      <text x="192" y="112" fontSize="12" className="fill-muted">dates and sources</text>
      <rect x="8" y="140" width="344" height="419" rx="16" fill="none" strokeDasharray="5 5" className="stroke-control" />
      <text x="28" y="172" fontSize="15" fontWeight="600" className="fill-ink">Your GitHub runner</text>
      {steps.map((s, i) => (
        <g key={s} transform={`translate(60 ${190 + i * 60})`}>
          <rect width="240" height="40" rx="10" className="fill-surface stroke-line" />
          <text x="120" y="25" textAnchor="middle" fontSize="13" className="fill-ink font-mono">{s}</text>
          {i < steps.length - 1 && <path d="M120 40v20m-5-7 5 7 5-7" fill="none" strokeWidth="1.5" className="stroke-control" />}
        </g>
      ))}
      <circle cx="82" cy="522" r="5" className="fill-brand" />
      <text x="96" y="527" fontSize="14" fontWeight="500" className="fill-ink">Keys and prompts stay here</text>
    </svg>
  );
}
