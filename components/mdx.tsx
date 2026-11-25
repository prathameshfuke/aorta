import Link from 'next/link';
import type { ComponentProps } from 'react';
import { CopyPre } from './copy-pre';

export const mdxComponents = {
  pre: CopyPre,
  a: ({ href = '', ...p }: ComponentProps<'a'>) => (href.startsWith('/') ? <Link href={href} {...p} /> : <a href={href} {...p} />),
  table: (p: ComponentProps<'table'>) => (
    <div className="table-scroll" tabIndex={0} role="group" aria-label="Table"><table {...p} /></div>
  ),
};
