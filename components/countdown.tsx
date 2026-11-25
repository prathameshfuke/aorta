'use client';
import { useEffect, useState } from 'react';
import { daysLeft } from '@/lib/dates';
import { Dot } from './ui';

/** `initial` is the build-time value, so server and first client render match. */
export function DaysLeft({ date, initial }: { date: string; initial: number }) {
  const [n, setN] = useState(initial);
  useEffect(() => {
    const real = daysLeft(date);
    let extra = real > 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 9 : 0;
    setN(real + extra);
    const tick = setInterval(() => { if (extra > 0) setN(real + --extra); else clearInterval(tick); }, 70);
    const refresh = setInterval(() => setN(daysLeft(date)), 60_000);
    return () => { clearInterval(tick); clearInterval(refresh); };
  }, [date]);
  if (n < 0) return <span className="text-muted">Passed</span>;
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <Dot live />
      <span className="font-mono font-medium tabular-nums text-brand-text">{n}</span>
      <span className="text-muted">{n === 1 ? 'day' : 'days'} left</span>
    </span>
  );
}

/** Days, hours, minutes and seconds to 00:00 UTC on the date. */
export function Clock({ date, initial }: { date: string; initial: number }) {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setMs(Math.max(0, Date.parse(`${date}T00:00:00Z`) - Date.now()));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [date]);
  if (ms === 0 || (ms === null && initial <= 0)) return <p className="text-h3">This date has passed.</p>;
  const s = ms === null ? null : Math.floor(ms / 1000);
  const parts: [string, number | null][] = [
    ['days', s === null ? initial : Math.floor(s / 86400)], ['hours', s === null ? null : Math.floor(s / 3600) % 24],
    ['minutes', s === null ? null : Math.floor(s / 60) % 60], ['seconds', s === null ? null : s % 60],
  ];
  return (
    <div role="timer" aria-label="Time left until 00:00 UTC on the date" className="grid max-w-xl grid-cols-4 divide-x divide-line rounded-lg border border-line bg-surface">
      {parts.map(([label, v], i) => (
        <div key={label} className="px-2 py-4 text-center">
          <div className={`font-mono text-h2 tabular-nums ${i === 0 ? 'text-brand-text' : ''}`}>{v === null ? '–' : String(v).padStart(2, '0')}</div>
          <div className="text-xs text-muted">{label}</div>
        </div>
      ))}
    </div>
  );
}
