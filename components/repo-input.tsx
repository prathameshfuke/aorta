// A plain GET form: works without JavaScript. /radar/scan validates the value.
export function RepoInput({ id, defaultValue }: { id: string; defaultValue?: string }) {
  return (
    <form action="/radar/scan" method="get" className="flex w-full max-w-md gap-1 rounded border border-control bg-surface p-1 focus-within:ring-2 focus-within:ring-ink">
      <label htmlFor={id} className="sr-only">Public GitHub repository URL</label>
      <input id={id} name="repo" required defaultValue={defaultValue} placeholder="github.com/owner/repo" inputMode="url" autoComplete="off" spellCheck={false}
        className="min-h-11 min-w-0 flex-1 rounded bg-transparent px-3 font-mono text-sm text-ink outline-none placeholder:text-muted" />
      <button type="submit" className="btn btn-quiet shrink-0 max-sm:px-4"><span aria-hidden className="sm:hidden">Scan</span><span className="max-sm:sr-only">Scan a public repo</span></button>
    </form>
  );
}
