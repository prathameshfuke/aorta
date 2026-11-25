/* eslint-disable @next/next/no-img-element */
import { PageHead, Title, Wrap } from '@/components/ui';
import { about } from '@/content/about';
import { site } from '@/content/site';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('/about', 'About', about.mission);

export default function About() {
  return (
    <>
      <PageHead title={about.mission} />
      <Wrap className="grid grid-cols-1 gap-10 py-section md:grid-cols-[16rem_1fr]">
        {about.founderPhoto
          ? <img src={about.founderPhoto} alt={about.founderName} width={256} height={320} className="w-64 rounded-lg border border-line object-cover" />
          : <div className="grid aspect-[4/5] w-64 place-items-center rounded-lg border border-dashed border-control text-sm text-muted">[Founder photo]</div>}
        <div className="max-w-2xl space-y-5">
          <h2 className="text-h3">{about.founderName}</h2>
          {about.story.map((p) => <p key={p}>{p}</p>)}
          <div className="pt-8">
            <Title text="Contact." />
            <a href={`mailto:${site.email}`} className="link mt-3 inline-flex min-h-11 items-center">{site.email}</a>
            <p className="text-muted">{site.location}</p>
          </div>
        </div>
      </Wrap>
    </>
  );
}
