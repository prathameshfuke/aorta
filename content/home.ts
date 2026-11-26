export const hero = {
  pill: { text: 'gpt-4o snapshots retire Jan 14, 2027', href: '/radar/gpt-4o-2024-08-06' },
  title: 'Your model is being retired. We’ll prove the replacement still works.',
  sub: 'Breakline is a Claude skill that finds retiring model and API calls, plans the fix as a diff, and proves the replacement on your own saved prompts.',
};

export const terminal = {
  command: 'python3 scripts/scan.py demo-repo',
  findings: [
    { at: 'app/triage.py:8', symbol: 'gpt-4o-2024-08-06', note: 'env default' },
    { at: 'app/triage.py:19', symbol: 'gpt-4o-2024-08-06', note: 'model kwarg' },
    { at: 'app/summarize.py:7', symbol: 'claude-opus-4-5-20251101', note: 'needs approval' },
    { at: 'web/shopify.ts:8', symbol: 'offline access token', note: 'needs a human' },
    { at: 'app/billing/invoice_parser.py:8', symbol: 'gpt-4.1-2025-04-14', note: 'policy: deny' },
  ],
};

export const steps = [
  { title: 'Scan', body: 'Exact model IDs in Python (parsed), JavaScript, TypeScript and config files, plus known deprecated API patterns.' },
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
  caption: 'From the bundled demo repo in simulated mode. No model was called. It shows how a swap that mislabels refund tickets gets caught.',
};

export const contrast = {
  title: 'Deterministic checks decide. AI only drafts.',
  intro: 'A new model ships, an old one retires, and someone has to show the app still behaves. A better model does not remove that job. It creates it again.',
  bots: { title: 'Free PR bots change the string.', points: ['One line edited, pull request opened.', 'Nothing runs your prompts.', 'You find the label drift in production.'] },
  breakline: { title: 'Breakline proves the behavior.', points: ['The patch must parse before it is proposed.', 'Your fixtures replay on both models.', 'A failing threshold means the pull request stays a draft.'] },
};

export const securityCards = [
  { title: 'Scripts run where you are.', body: 'Scanning, patching and parity run on your machine or CI runner. Aorta receives nothing. Claude does read the files it opens.' },
  { title: 'Nothing merges itself.', body: 'No source file changes until you approve the diff, and the skill never merges a pull request.' },
  { title: 'Policy as code.', body: 'Allow, ask or deny rules live in your repo, versioned and reviewed with everything else.' },
];

export const faq = [
  { q: 'What is Breakline today?', a: 'A public Agent Skill: Python scripts plus the instructions Claude follows. There is no hosted service or GitHub App yet.' },
  { q: 'Which providers are covered?', a: 'The skill ships records for OpenAI, Anthropic and Shopify, each with a link to the provider’s own notice. It tells you when a provider is not covered.' },
  { q: 'Do you see my prompts or keys?', a: 'Aorta receives nothing. Claude is a hosted model, so what it reads while running the skill is sent to it. Live parity sends fixture prompts to the two models you compare, using your keys.' },
  { q: 'What if parity fails?', a: 'The report lists each regression by fixture ID and the pull request stays a draft. Fix the parser or prompt, or choose another replacement, and run it again.' },
  { q: 'Which languages are supported?', a: 'Python and JavaScript/TypeScript, plus config and env files.' },
  { q: 'How is this different from Dependabot?', a: 'Dependabot updates package versions. Breakline looks for model IDs and API patterns inside your code and config, then tests how the replacement behaves.' },
  { q: 'Can I pick the replacement model?', a: 'Yes, and you have to. Set it in .breakline/policy.yaml or answer when Claude asks. Breakline does not choose one for you.' },
];

export const skillBlock = {
  title: 'Ask Claude to run it.',
  body: 'Install the skill, then say what is retiring. Claude runs the scanner, the codemods and the parity checks, shows you the diff, and asks before it writes a file.',
  prompt: 'our gpt-4o calls die in January, fix them',
  note: 'Works in Claude Code, the Claude apps and the Agent SDK. Needs Python 3.10 or newer and PyYAML.',
};

export const finalCta = { title: 'Find what breaks before your users do.' };
