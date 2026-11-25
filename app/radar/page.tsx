import { RadarTable } from '@/components/radar-table';
import { PageHead, Wrap } from '@/components/ui';
import { pageMeta } from '@/lib/meta';

const intro = 'Model and API retirements, each with a countdown and a link to the provider’s own notice.';
export const metadata = pageMeta('/radar', 'Retirement Radar', intro);

export default function Radar() {
  return (
    <>
      <PageHead title="Retirement Radar." intro={intro} />
      <Wrap className="py-12 sm:py-16"><RadarTable builtAt={new Date().toISOString()} /></Wrap>
    </>
  );
}
