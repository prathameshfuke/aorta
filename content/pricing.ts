export const plans = [
  { name: 'Free', usd: '$0', inr: '₹0', unit: '', includes: ['Public repos', '1 private repo scan'] },
  { name: 'Pro', usd: '$49', inr: '₹3,999', unit: 'per repo / month', includes: ['Continuous watch', 'Auto-PRs', 'Parity reports'] },
  { name: 'Team', usd: '$299', inr: '₹24,999', unit: 'per month, 20 repos', includes: ['Recorded-traffic replay', 'Cost-down suggestions', 'Slack approvals'] },
];

export const rescue = {
  name: 'Deadline Rescue',
  usd: '$299–$499',
  inr: null as string | null, // no INR price set
  body: 'A done-with-you migration before a hard date. One-off.',
};

export const comparison: { feature: string; in: [boolean | string, boolean | string, boolean | string] }[] = [
  { feature: 'Public repo scans', in: [true, true, true] },
  { feature: 'Private repos', in: ['1 scan', 'Per repo', '20 repos'] },
  { feature: 'Continuous watch', in: [false, true, true] },
  { feature: 'Automatic pull requests', in: [false, true, true] },
  { feature: 'Parity reports', in: [false, true, true] },
  { feature: 'Recorded-traffic replay', in: [false, false, true] },
  { feature: 'Cost-down suggestions', in: [false, false, true] },
  { feature: 'Slack approvals', in: [false, false, true] },
];
// ponytail: assumes Team includes everything in Pro. Confirm before launch.

export const pricingFaq = [
  { q: 'Who pays for the model calls during parity?', a: 'You do. Fixtures replay with your own API keys on your runner, so provider charges go to your account.' },
  { q: 'What counts as a repo?', a: 'One GitHub repository. Pro is billed for each repository Breakline watches. Team covers up to 20.' },
  { q: 'Which currency am I billed in?', a: 'Prices are listed in USD and INR. Use the toggle to compare. Taxes are not included in the listed prices.' },
  { q: 'What is Deadline Rescue?', a: 'A one-off engagement where we work through the migration with you before a retirement date. The price within the range depends on the size of the work.' },
];
