import { Legal } from '@/components/legal';
import { privacy } from '@/content/legal';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('/privacy', 'Privacy policy', 'Privacy policy template for Aorta, pending legal review.');
export default function Page() { return <Legal {...privacy} />; }
