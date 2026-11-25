import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bySoonest, daysLeft, parseRepo } from './dates.ts';

const now = new Date('2026-11-25T23:59:00Z');

test('daysLeft counts calendar days in UTC', () => {
  assert.equal(daysLeft('2027-01-14', now), 50);
  assert.equal(daysLeft('2026-11-25', now), 0);
  assert.equal(daysLeft('2026-11-24', now), -1);
});

test('bySoonest puts past items last', () => {
  const sorted = bySoonest([{ date: '2027-04-01' }, { date: '2026-01-01' }, { date: '2027-01-01' }], now);
  assert.deepEqual(sorted.map((x) => x.date), ['2027-01-01', '2027-04-01', '2026-01-01']);
});

test('parseRepo accepts GitHub repos only', () => {
  assert.equal(parseRepo('https://github.com/vercel/next.js'), 'vercel/next.js');
  assert.equal(parseRepo('github.com/a/b.git/'), 'a/b');
  assert.equal(parseRepo('owner/repo'), 'owner/repo');
  for (const bad of ['https://gitlab.com/a/b', 'javascript:alert(1)', 'github.com/a', 'a/..', '']) assert.equal(parseRepo(bad), null);
});
