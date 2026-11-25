import Link from 'next/link';
import { PageHead, Wrap } from '@/components/ui';

export default function NotFound() {
  return (
    <>
      <PageHead title="This page does not exist." intro="The link may be old, or the address mistyped." />
      <Wrap className="py-12"><Link href="/" className="btn btn-primary">Go to the home page</Link></Wrap>
    </>
  );
}
