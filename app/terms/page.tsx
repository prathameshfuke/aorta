import { Legal } from '@/components/legal';
import { terms } from '@/content/legal';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('/terms', 'Terms of service', 'Terms of service template for Aorta, pending legal review.');
export default function Page() { return <Legal {...terms} />; }
