import { DataFlow } from '@/components/data-flow';
import { PageHead, Section, Title, Wrap } from '@/components/ui';
import { securityCards } from '@/content/home';
import { permissions, privacyNotes, stored } from '@/content/security';
import { site } from '@/content/site';
import { pageMeta } from '@/lib/meta';

const intro = 'Your code, API keys and prompts never leave your GitHub runner.';
export const metadata = pageMeta('/security', 'Security', intro);

const Table = ({ label, head, rows }: { label: string; head: string[]; rows: string[][] }) => (
  <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-surface" tabIndex={0} role="region" aria-label={label}>
    <table className="w-full text-left text-xs sm:text-sm">
      <thead className="border-b border-line bg-subtle"><tr>{head.map((h) => <th key={h} scope="col" className="px-3 py-3 font-medium sm:px-4">{h}</th>)}</tr></thead>
      <tbody className="divide-y divide-line">
        {rows.map(([first, ...rest]) => <tr key={first}><th scope="row" className="px-3 py-3 align-top font-medium sm:px-4">{first}</th>{rest.map((c, i) => <td key={i} className="px-3 py-3 align-top text-muted sm:px-4">{c}</td>)}</tr>)}
      </tbody>
    </table>
  </div>
);

export default function Security() {
  return (
    <>
      <PageHead title="Runs where your code already is." intro={intro} />
      <Wrap className="grid grid-cols-1 gap-12 py-section lg:grid-cols-2 lg:items-center">
        <DataFlow />
        <ul className="space-y-8">{securityCards.map((c) => <li key={c.title}><h2 className="text-h3">{c.title}</h2><p className="mt-2 text-muted">{c.body}</p></li>)}</ul>
      </Wrap>
      <Section>
        <Title text="Permissions." />
        <Table label="GitHub App permissions" head={['Permission', 'Access', 'Why']} rows={permissions.map((p) => [p.scope, p.access, p.why])} />
        <p className="mt-4 max-w-3xl text-sm text-muted">GitHub cannot scope the contents permission to a branch prefix. Breakline pushes only to breakline/* branches. Add a branch ruleset to have GitHub enforce that.</p>
      </Section>
      <Section>
        <Title text="What is stored." />
        <Table label="Stored data and retention" head={['Data', 'Stored by Aorta', 'Retention']} rows={stored.map((s) => [s.data, s.kept, s.retention])} />
      </Section>
      <Section>
        <Title text="DPDP and GDPR notes." />
        <div className="mt-8 grid gap-4 md:grid-cols-2">{privacyNotes.map((n) => <div key={n.title} className="rounded-lg border border-line bg-surface p-6"><h3 className="text-h3">{n.title}</h3><p className="mt-3 text-muted">{n.body}</p></div>)}</div>
        <p className="mt-4 text-sm text-muted">These notes describe intent. They are not legal advice or a compliance certification.</p>
      </Section>
      <Section>
        <Title text="Report a vulnerability." />
        <p className="mt-4 max-w-2xl text-muted">Send the steps to reproduce to the address below. Please give us time to fix the issue before publishing it.</p>
        <a href={`mailto:${site.securityEmail}`} className="link mt-3 inline-flex min-h-11 items-center font-mono">{site.securityEmail}</a>
      </Section>
    </>
  );
}
