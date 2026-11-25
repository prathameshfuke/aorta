'use client';
import { useSearchParams } from 'next/navigation';
import { parseRepo } from '@/lib/dates';
import { RepoInput } from './repo-input';

export function ScanResult() {
  const raw = useSearchParams().get('repo') ?? '';
  const repo = parseRepo(raw);
  return (
    <>
      <RepoInput key={raw} id="repo-scan" defaultValue={raw} />
      <div role="status" className="mt-8 max-w-2xl rounded-lg border border-line bg-surface p-6">
        {repo ? (
          <>
            <p className="break-all font-mono text-sm text-muted">{repo}</p>
            <h2 className="mt-2 text-h3">Hosted scanning is not live yet</h2>
            <p className="mt-3 text-muted">Nothing was scanned and nothing was sent anywhere. When it launches, findings for this repository will appear here. The commands below run the same check on your machine.</p>
            <pre tabIndex={0} className="mt-4 overflow-x-auto rounded bg-code p-4 font-mono text-xs text-code-ink">{`git clone https://github.com/${repo}\nnpx breakline scan ./${repo.split('/')[1]}`}</pre>
          </>
        ) : raw ? (
          <><h2 className="text-h3">That is not a GitHub repository URL</h2><p className="mt-3 text-muted">Enter it as github.com/owner/repo.</p></>
        ) : (
          <><h2 className="text-h3">No repository entered</h2><p className="mt-3 text-muted">Paste a public repository URL above.</p></>
        )}
      </div>
    </>
  );
}
