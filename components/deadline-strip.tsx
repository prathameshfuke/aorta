'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deadlines } from '@/content/deadlines';
import { bySoonest, daysLeft, longDate } from '@/lib/dates';
import { DaysLeft } from './countdown';
import { Unverified, Wrap } from './ui';

export function DeadlineStrip({ builtAt }: { builtAt: string }) {
  const [now, setNow] = useState(() => new Date(builtAt));
  useEffect(() => setNow(new Date()), []);
  const next = bySoonest(deadlines, now).filter((d) => daysLeft(d.date, now) >= 0).slice(0, 4);
  return (
    <section aria-labelledby="next-up" className="border-t border-line bg-surface">
      <Wrap className="py-10">
        <div className="flex items-center justify-between gap-4">
          <h2 id="next-up" className="text-sm font-semibold">Next retirements</h2>
          <Link href="/radar" className="link inline-flex min-h-11 items-center text-sm">See all on the Radar</Link>
        </div>
        <ul className="mt-2 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {next.map((d) => (
            <li key={d.slug} className="flex min-w-0 flex-col border-b border-line py-5 last:border-b-0 sm:px-5 sm:odd:pl-0 lg:border-b-0 lg:border-l lg:odd:pl-5 lg:first:border-l-0 lg:first:!pl-0">
              <DaysLeft date={d.date} initial={daysLeft(d.date, new Date(builtAt))} />
              <Link href={`/radar/${d.slug}`} className="mt-2 flex min-h-11 items-center break-words font-mono text-sm font-medium hover:underline">{d.symbol}</Link>
              <p className="mt-auto text-sm text-muted">
                {d.provider}, <a href={d.sourceUrl} className="link inline-block py-2" aria-label={`${longDate(d.date)}, source for ${d.symbol}`}>{longDate(d.date)}</a> {!d.verified && <Unverified />}
              </p>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
