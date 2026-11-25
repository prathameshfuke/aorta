'use client';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deadlines } from '@/content/deadlines';
import { bySoonest, daysLeft, longDate } from '@/lib/dates';
import { DaysLeft } from './countdown';
import { Unverified } from './ui';

const providers = [...new Set(deadlines.map((d) => d.provider))];

export function RadarTable({ builtAt }: { builtAt: string }) {
  const [now, setNow] = useState(() => new Date(builtAt));
  useEffect(() => setNow(new Date()), []);
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState('');
  const q = query.trim().toLowerCase();
  const rows = bySoonest(deadlines, now).filter((d) => (!provider || d.provider === provider) && `${d.symbol} ${d.provider} ${d.type}`.toLowerCase().includes(q));
  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search model or API" aria-label="Search model or API" className="field placeholder:text-muted sm:w-80" />
        <select value={provider} onChange={(e) => setProvider(e.target.value)} aria-label="Filter by provider" className="field">
          <option value="">All providers</option>
          {providers.map((p) => <option key={p}>{p}</option>)}
        </select>
        <p role="status" className="text-sm text-muted sm:ml-auto">{rows.length} of {deadlines.length}, soonest first</p>
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface">
        <table className="w-full text-left text-sm max-lg:block">
          <thead className="border-b border-line bg-subtle text-muted max-lg:sr-only">
            <tr>{['Provider', 'Model or API', 'Type', 'Effective date', 'Days left', 'Source'].map((h) => <th key={h} scope="col" className="px-4 py-3 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-line max-lg:block">
            {rows.map((d) => {
              const past = daysLeft(d.date, now) < 0;
              return (
                <tr key={d.slug} className={`relative hover:bg-subtle max-lg:grid max-lg:grid-cols-[1fr_auto] max-lg:items-center max-lg:gap-x-3 max-lg:gap-y-1 max-lg:p-4 ${past ? 'opacity-60' : ''}`}>
                  <td className="text-muted max-lg:order-3 lg:px-4 lg:py-3">{d.provider}</td>
                  <th scope="row" className="font-medium max-lg:order-1 max-lg:col-span-2 lg:px-4 lg:py-3">
                    <Link href={`/radar/${d.slug}`} className="break-words font-mono after:absolute after:inset-0 hover:underline">{d.symbol}</Link>
                    {!d.verified && <span className="ml-2"><Unverified /></span>}
                  </th>
                  <td className="text-muted max-lg:order-4 max-lg:text-right lg:px-4 lg:py-3">{d.type}</td>
                  <td className="tabular-nums max-lg:order-5 lg:whitespace-nowrap lg:px-4 lg:py-3">{longDate(d.date)}</td>
                  <td className="max-lg:order-2 max-lg:col-span-2 lg:px-4 lg:py-3"><DaysLeft date={d.date} initial={daysLeft(d.date, new Date(builtAt))} /></td>
                  <td className="max-lg:order-6 max-lg:text-right lg:px-4 lg:py-1">
                    <a href={d.sourceUrl} className="link relative z-10 inline-flex min-h-11 items-center gap-1" aria-label={`Source for ${d.symbol}`}>Source<ExternalLink size={13} aria-hidden /></a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-6 text-muted">No match. <button type="button" className="link min-h-11" onClick={() => { setQuery(''); setProvider(''); }}>Clear the filters</button></p>}
      </div>
    </>
  );
}
