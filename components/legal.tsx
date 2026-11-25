import { site } from '@/content/site';
import { PageHead, Wrap } from './ui';

export function Legal({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHead title={`${title}.`}>
        <p role="note" className="mt-6 max-w-2xl rounded border border-warn bg-surface px-4 py-3 font-medium text-warn-text">Template for review by a lawyer. Not in effect. Bracketed text is still to be written.</p>
      </PageHead>
      <Wrap className="py-12 sm:py-16">
        <div className="max-w-2xl space-y-10">
          {sections.map((s) => <section key={s.h}><h2 className="text-h3">{s.h}</h2><p className="mt-3 text-muted">{s.p}</p></section>)}
          <p>Contact: <a href={`mailto:${site.email}`} className="link">{site.email}</a></p>
        </div>
      </Wrap>
    </>
  );
}
