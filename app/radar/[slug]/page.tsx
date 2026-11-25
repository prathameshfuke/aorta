import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock } from '@/components/countdown';
import { RepoInput } from '@/components/repo-input';
import { PageHead, Title, Unverified, Wrap } from '@/components/ui';
import { deadlines } from '@/content/deadlines';
import { daysLeft, longDate, monthYear } from '@/lib/dates';
import { pageMeta } from '@/lib/meta';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => deadlines.map((d) => ({ slug: d.slug }));

const find = async ({ params }: Props) => {
  const { slug } = await params;
  return deadlines.find((d) => d.slug === slug) ?? notFound();
};

export async function generateMetadata(props: Props) {
  const d = await find(props);
  return pageMeta(`/radar/${d.slug}`, `${d.symbol} retirement date (${monthYear(d.date)}) — Aorta Radar`, `${d.symbol} (${d.provider}) retires ${longDate(d.date)}. What changes, what breaks and what to do next.`, true);
}

export default async function Detail(props: Props) {
  const d = await find(props);
  const blocks = [['What changes', d.whatChanges], ['What usually breaks', d.whatBreaks], ['Suggested next steps', d.nextSteps]] as const;
  return (
    <>
      <PageHead title={`${d.symbol} retirement: ${longDate(d.date)}`}>
        <p className="mt-5 flex flex-wrap items-center gap-3 text-muted"><span>{d.provider}, {d.type.toLowerCase()}</span>{!d.verified && <Unverified />}</p>
        <div className="mt-8"><Clock date={d.date} initial={daysLeft(d.date)} /></div>
        <p className="mt-3 text-sm text-muted">Time until 00:00 UTC on {longDate(d.date)}.</p>
      </PageHead>
      <Wrap className="grid grid-cols-1 gap-12 py-12 sm:py-20 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="max-w-2xl space-y-12">
          {blocks.map(([h, items]) => (
            <section key={h}><h2 className="text-h3">{h}</h2><ul className="dots mt-4">{items.map((i) => <li key={i} className="break-words">{i}</li>)}</ul></section>
          ))}
          <p>
            <a href={d.sourceUrl} className="link inline-flex min-h-11 items-center gap-2">Official notice from {d.provider}<ExternalLink size={15} aria-hidden /></a>
            {d.checkedOn && <span className="block text-sm text-muted">Date checked against this page on {longDate(d.checkedOn)}.</span>}
          </p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="Other retirements">
            <h2 className="text-sm font-semibold">Other retirements</h2>
            <ul className="mt-2">{deadlines.filter((x) => x.slug !== d.slug).map((x) => <li key={x.slug}><Link href={`/radar/${x.slug}`} className="foot-link break-all font-mono">{x.symbol}</Link></li>)}</ul>
          </nav>
        </aside>
      </Wrap>
      <section className="border-t border-line bg-surface py-section">
        <Wrap>
          <Title text="Check your repo." />
          <p className="mb-6 mt-4 break-words text-muted">See whether anything in it depends on {d.symbol}.</p>
          <RepoInput id="repo-detail" />
        </Wrap>
      </section>
    </>
  );
}
