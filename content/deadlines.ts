// Single source for the home strip, /radar, detail pages, sitemap and OG images.
// Set `verified: true` only after reading the date on the provider page at `sourceUrl`.
export type Deadline = {
  slug: string;
  symbol: string;
  provider: 'OpenAI' | 'Anthropic' | 'Shopify';
  type: 'Model retirement' | 'Auth change';
  date: string; // ISO yyyy-mm-dd, treated as UTC
  sourceUrl: string;
  verified: boolean;
  checkedOn?: string;
  providerReplacement?: string;
  whatChanges: string[];
  whatBreaks: string[];
  nextSteps: string[];
};

const OPENAI = 'https://developers.openai.com/api/docs/deprecations';
const ANTHROPIC = 'https://platform.claude.com/docs/en/about-claude/model-deprecations';
const SHOPIFY = 'https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens#offline-access-tokens';

const model = (symbol: string, provider: 'OpenAI' | 'Anthropic', date: string, providerReplacement: string, extra: Partial<Deadline> = {}): Deadline => ({
  slug: symbol.replaceAll('.', '-'),
  symbol,
  provider,
  type: 'Model retirement',
  date,
  providerReplacement,
  sourceUrl: provider === 'OpenAI' ? OPENAI : ANTHROPIC,
  verified: true,
  checkedOn: '2026-11-25',
  whatChanges: [
    `${provider} retires ${symbol} on the date above. Requests that name this model ID stop working.`,
    `${provider} lists ${providerReplacement} as the replacement. It is a different model, so treat the swap as a behaviour change.`,
  ],
  whatBreaks: [
    'Model IDs hard-coded in calls, environment defaults and config files, including copies nobody remembers.',
    'Parsers that expect bare JSON when the new model wraps output in code fences or adds text.',
    'Classifiers and routers where the new model picks a different label for the same input.',
    'Cost and latency budgets that were tuned for the old model.',
  ],
  nextSteps: [
    `Search the codebase for ${symbol}, including env files and deployment config.`,
    'Save real prompts with the outputs you rely on as fixtures.',
    'Replay them against the replacement and compare schema, labels, numbers, cost and latency.',
    'Merge only after the checks pass, ahead of the date.',
  ],
  ...extra,
});

export const deadlines: Deadline[] = [
  model('gpt-4o-2024-08-06', 'OpenAI', '2027-01-14', 'gpt-6-luna'),
  model('gpt-4o-2024-11-20', 'OpenAI', '2027-01-14', 'gpt-6-luna'),
  model('gpt-4o-mini-2024-07-18', 'OpenAI', '2027-01-14', 'gpt-6-luna'),
  model('gpt-4.1-2025-04-14', 'OpenAI', '2027-01-14', 'gpt-6-luna'),
  model('claude-opus-4-5-20251101', 'Anthropic', '2027-01-22', 'claude-opus-5-5', {
    whatChanges: [
      'Anthropic retires claude-opus-4-5-20251101 on the date above. The undated ID claude-opus-4-5 retires with it.',
      'Anthropic lists claude-opus-5-5 as the replacement. It is a different model, so treat the swap as a behaviour change.',
    ],
  }),
  model('whisper-1', 'OpenAI', '2027-02-26', 'gpt-live-transcribe or gpt-transcribe', {
    whatBreaks: [
      'Transcription calls that name whisper-1.',
      'Code that depends on a response format, timestamps or segment fields the replacement may return differently.',
      'Cost and latency budgets for audio jobs.',
    ],
  }),
  model('gpt-5.1', 'OpenAI', '2027-04-01', 'gpt-6-sol'),
  {
    slug: 'shopify-offline-tokens',
    symbol: 'Shopify non-expiring offline tokens',
    provider: 'Shopify',
    type: 'Auth change',
    date: '2027-01-01',
    sourceUrl: SHOPIFY,
    verified: true,
    checkedOn: '2026-11-25',
    whatChanges: [
      'On January 1, 2027, public apps that still use non-expiring offline access tokens are delisted and blocked from new installs.',
      'Shopify says existing installs can keep making the affected API requests until April 1, 2027. After that, Admin API requests with a non-expiring offline token are rejected.',
      'Custom apps and merchant-created apps follow a different timeline. Check the source.',
    ],
    whatBreaks: [
      'Token exchange code that never requests an expiring token.',
      'Background jobs that store one token forever and have no refresh step.',
      'Session storage with no column for expiry or refresh token.',
    ],
    nextSteps: [
      'Find where offline tokens are requested and stored.',
      'Add expiry and refresh-token storage.',
      'Move to expiring offline tokens and test the refresh path before the date.',
      'Breakline flags these call sites for a human. It does not auto-rewrite auth code.',
    ],
  },
];
