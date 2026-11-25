const DAY = 86_400_000;

/** Whole days from today (UTC calendar date) to an ISO date. Negative once it has passed. */
export function daysLeft(iso: string, now: Date = new Date()): number {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((Date.parse(`${iso}T00:00:00Z`) - today) / DAY);
}

const fmt = (iso: string, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...o }).format(new Date(`${iso}T00:00:00Z`));

export const longDate = (iso: string) => fmt(iso, { month: 'short', day: 'numeric', year: 'numeric' });
export const monthYear = (iso: string) => fmt(iso, { month: 'long', year: 'numeric' });

/** Soonest first; anything already past goes to the end. */
export function bySoonest<T extends { date: string }>(items: T[], now: Date = new Date()): T[] {
  const past = (x: T) => Number(daysLeft(x.date, now) < 0);
  return [...items].sort((a, b) => past(a) - past(b) || a.date.localeCompare(b.date));
}

/** "owner/repo" for a public GitHub URL (or bare owner/repo), else null. */
export function parseRepo(input: string): string | null {
  const m = input.trim().match(/^(?:(?:https?:\/\/)?(?:www\.)?github\.com\/)?([A-Za-z0-9](?:[A-Za-z0-9-]{0,38}))\/([A-Za-z0-9._-]{1,100}?)(?:\.git)?\/?$/);
  return m && m[2] !== '.' && m[2] !== '..' ? `${m[1]}/${m[2]}` : null;
}
