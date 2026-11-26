type Doc = { title: string; sections: { h: string; p: string }[] };
export const privacy: Doc = {
  title: 'Privacy policy',
  sections: [
    { h: 'Who we are', p: '[Legal entity name], [registered address], operates Aorta Breakline. Contact: see the email below.' },
    { h: 'What stays with you', p: 'Breakline runs on your GitHub runner. Source code, prompts, fixtures and provider API keys are not sent to Aorta.' },
    { h: 'What we collect', p: '[List any website or contact data actually collected, with the purpose and lawful basis for each.]' },
    { h: 'Processors', p: '[List hosting, payment and email providers and where they process data.]' },
    { h: 'Retention', p: '[State a retention period for each category.]' },
    { h: 'Your rights', p: '[Describe access, correction, erasure, withdrawal of consent and grievance handling under the DPDP Act and GDPR.]' },
  ],
};
export const terms: Doc = {
  title: 'Terms of service',
  sections: [
    { h: 'Agreement', p: '[Parties, acceptance and eligibility.]' },
    { h: 'The service', p: 'Breakline proposes code changes and reports parity results. You review and merge every change. A passing report covers only the fixtures and thresholds you supplied.' },
    { h: 'Your responsibilities', p: '[Provider API usage and charges, fixture content, access control.]' },
    { h: 'Liability', p: '[Warranty disclaimer and limitation of liability.]' },
    { h: 'Governing law', p: '[Jurisdiction and dispute resolution.]' },
  ],
};
