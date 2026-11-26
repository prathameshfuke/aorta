import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { ogName } from '@/lib/meta';
import { pages } from '@/lib/pages';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const generateStaticParams = async () => (await pages()).map((p) => ({ file: ogName(p.path) }));

const read = (...p: string[]) => fs.readFileSync(path.join(process.cwd(), ...p));

export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const page = (await pages()).find((p) => ogName(p.path) === file)!;
  const product = `data:image/svg+xml;base64,${read('public', 'brand', 'breakline-horizontal-light.svg').toString('base64')}`;
  const logo = `data:image/svg+xml;base64,${read('public', 'brand', 'logo-light-bg.svg').toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 80, background: '#FAFAFA', color: '#111111', fontFamily: 'Geist' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={282} height={60} />
        <div style={{ display: 'flex', fontSize: page.title.length > 55 ? 60 : 76, lineHeight: 1.12, letterSpacing: '-0.035em', maxWidth: 1000 }}>{page.title}</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product} alt="" width={324} height={48} />
      </div>
    ),
    { width: 1200, height: 630, fonts: [{ name: 'Geist', data: read('node_modules', 'geist', 'dist', 'fonts', 'geist-sans', 'Geist-SemiBold.ttf'), weight: 600 }] },
  );
}
