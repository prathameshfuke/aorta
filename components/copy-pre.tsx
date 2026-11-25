'use client';
import { Check, Copy } from 'lucide-react';
import { useRef, useState, type ComponentProps } from 'react';

export function CopyPre(props: ComponentProps<'pre'>) {
  const ref = useRef<HTMLPreElement>(null);
  const [state, setState] = useState<'idle' | 'done' | 'failed'>('idle');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ref.current?.textContent ?? '');
      setState('done');
    } catch {
      setState('failed');
    }
    setTimeout(() => setState('idle'), 2000);
  };
  return (
    <div className="relative">
      <pre ref={ref} {...props} tabIndex={0} />
      <button type="button" onClick={copy} className="absolute right-2 top-2 inline-flex h-11 min-w-11 items-center justify-center gap-1 rounded border border-line bg-surface px-2 text-xs text-muted hover:text-ink">
        {state === 'done' ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
        <span className={state === 'idle' ? 'sr-only' : ''} aria-live="polite">{state === 'done' ? 'Copied' : state === 'failed' ? 'Select to copy' : 'Copy code'}</span>
      </button>
    </div>
  );
}
