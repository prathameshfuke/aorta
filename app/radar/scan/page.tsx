import { Suspense } from 'react';
import { ScanResult } from '@/components/scan-result';
import { PageHead, Wrap } from '@/components/ui';
import { pageMeta } from '@/lib/meta';

export const metadata = { ...pageMeta('/radar/scan', 'Scan a public repo', 'Check a public GitHub repository for retiring models and APIs.'), robots: { index: false } };

export default function Scan() {
  return (
    <>
      <PageHead title="Scan a public repo." />
      <Wrap className="min-h-[28rem] py-12"><Suspense fallback={<p className="text-muted">Loading</p>}><ScanResult /></Suspense></Wrap>
    </>
  );
}
