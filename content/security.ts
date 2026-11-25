export const permissions = [
  { scope: 'Contents', access: 'Read and write', why: 'Read code on your runner and push the patch to a breakline/* branch.' },
  { scope: 'Pull requests', access: 'Read and write', why: 'Open and update the pull request that carries the parity report.' },
  { scope: 'Metadata', access: 'Read', why: 'Required by GitHub for every app.' },
];

export const stored = [
  { data: 'Source code', kept: 'No', retention: 'Never leaves your runner' },
  { data: 'Prompts and fixtures', kept: 'No', retention: 'Never leaves your runner' },
  { data: 'Provider API keys', kept: 'No', retention: 'Held in your GitHub secrets' },
  { data: 'Change registry (retirement dates and sources)', kept: 'Yes', retention: 'Public data, kept indefinitely' },
  { data: 'Account and billing contact', kept: 'Yes, once billing exists', retention: 'To be decided before launch' },
];

export const privacyNotes = [
  { title: 'DPDP Act, 2023 (India)', body: 'The only personal data planned is account and billing contact information. A notice, a way to withdraw consent and a grievance contact need to be in place before collection starts.' },
  { title: 'GDPR (EU and UK)', body: 'Because code and prompts stay on your runner, Breakline is not designed to process the personal data inside them. A data processing agreement and a lawful basis for account data still need legal review.' },
];
