export const hero = {
  pill: { text: 'gpt-4o snapshots retire Jan 14, 2027', href: '/radar/gpt-4o-2024-08-06' },
  title: 'Your model is being retired. We’ll prove the replacement still works.',
  sub: 'Aorta Breakline finds every LLM and API call about to break, opens the fix as a pull request, and attaches a parity report from your own prompts.',
};

export const terminal = {
  command: 'npx breakline scan .',
  findings: [
    { at: 'app/triage.py:8', symbol: 'gpt-4o-2024-08-06', note: 'env default' },
    { at: 'app/triage.py:19', symbol: 'gpt-4o-2024-08-06', note: 'model kwarg' },
    { at: 'app/summarize.py:7', symbol: 'claude-opus-4-5-20251101', note: 'needs approval' },
    { at: 'web/shopify.ts:8', symbol: 'offline access token', note: 'needs a human' },
    { at: 'app/billing/invoice_parser.py:8', symbol: 'gpt-4o-2024-08-06', note: 'policy: deny' },
  ],
};

export const steps = [
  { title: 'Scan', body: 'AST-level detection of model IDs, env defaults, config values and deprecated API patterns.' },
  { title: 'Patch', body: 'Deterministic codemods. Every change must parse. Policy decides allow, ask or deny.' },
  { title: 'Prove', body: 'Your saved prompts replay against old and new models. Schema, labels, numbers, cost, latency.' },
];

export const proof = {
  title: 'Parity: gpt-4o-2024-08-06 → gpt-5.4-mini: FAIL',
  rows: [
    { check: 'Schema-valid', result: '80%', threshold: '100%', status: 'fail' },
    { check: 'Label agreement', result: '60%', threshold: '95%', status: 'fail' },
    { check: 'Cost', result: '−81%', threshold: 'max +25%', status: 'pass' },
    { check: 'Latency', result: '820 ms → 610 ms', threshold: 'info only', status: 'info' },
  ] as { check: string; result: string; threshold: string; status: 'pass' | 'fail' | 'info' }[],
  regressions: [
    { id: 't01', text: 'intent: refund_request → billing_question' },
    { id: 't04', text: 'output wrapped in ``` fences' },
  ],
  caption: 'Example report. A one-line model swap that would have silently mislabeled refund tickets.',
};

export const contrast = {
  title: 'Deterministic checks decide. AI only drafts.',
  intro: 'A new model ships, an old one retires, and someone has to show the app still behaves. A better model does not remove that job. It creates it again.',
  bots: { title: 'Free PR bots change the string.', points: ['One line edited, pull request opened.', 'Nothing runs your prompts.', 'You find the label drift in production.'] },
  breakline: { title: 'Breakline proves the behavior.', points: ['The patch must parse before it is proposed.', 'Your fixtures replay on both models.', 'A failing threshold keeps the pull request in draft.'] },
};

export const securityCards = [
  { title: 'Runs in your CI.', body: 'Scanner, codemods and parity run on your GitHub runner. Code, API keys and prompts never leave it.' },
  { title: 'Least-privilege GitHub App.', body: 'The app writes only to breakline/* branches. You review and merge like any other pull request.' },
  { title: 'Policy as code.', body: 'Allow, ask or deny rules live in your repo, versioned and reviewed with everything else.' },
];

export const faq = [
  { q: 'Which providers are covered?', a: 'The Retirement Radar currently tracks OpenAI, Anthropic and Shopify. New records are added with a link to the provider’s own notice.' },
  { q: 'Do you see my prompts or keys?', a: 'No. Parity replays on your GitHub runner with your keys. Prompts, keys and code stay there.' },
  { q: 'What if parity fails?', a: 'The pull request stays a draft and lists each regression by fixture ID. Fix the parser or prompt, or choose another replacement, and run it again.' },
  { q: 'Which languages are supported?', a: 'Python and JavaScript/TypeScript.' },
  { q: 'How is this different from Dependabot?', a: 'Dependabot updates package versions. Breakline looks for model IDs and API patterns inside your code and config, then tests how the replacement behaves.' },
  { q: 'Can I pick the replacement model?', a: 'Yes. You set the replacement map in .breakline/policy.yaml. Breakline tests whatever you choose.' },
];

export const finalCta = { title: 'Find what breaks before your users do.' };
