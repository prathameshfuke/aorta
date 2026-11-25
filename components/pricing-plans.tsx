import Link from 'next/link';
import { plans, rescue } from '@/content/pricing';
import { site } from '@/content/site';

const Price = ({ usd, inr }: { usd: string; inr: string | null }) => (
  <>
    <span className="group-has-[.inr:checked]/price:hidden">{usd}</span>
    <span className="hidden group-has-[.inr:checked]/price:inline">{inr ?? `${usd} (USD only)`}</span>
  </>
);

// Currency toggle is two radios and CSS :has(), no JavaScript.
export function PricingPlans({ toggle = false }: { toggle?: boolean }) {
  return (
    <div className="group/price">
      {toggle && (
        <fieldset className="mb-8 inline-flex rounded border border-line bg-surface p-1">
          <legend className="sr-only">Currency</legend>
          {['usd', 'inr'].map((c) => (
            <label key={c} className="relative cursor-pointer">
              <input type="radio" name="currency" className={`${c} peer sr-only`} defaultChecked={c === 'usd'} />
              <span className="flex min-h-11 items-center rounded px-5 text-sm font-medium uppercase text-muted peer-checked:bg-ink peer-checked:text-bg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">{c}</span>
            </label>
          ))}
        </fieldset>
      )}
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <article key={p.name} className={`flex flex-col rounded-lg border bg-surface p-6 ${p.name === 'Pro' ? 'border-ink' : 'border-line'}`}>
            <h3 className="text-h3">{p.name}</h3>
            <p className="mt-4 text-h2 tabular-nums"><Price usd={p.usd} inr={p.inr} /></p>
            <p className="min-h-6 text-sm text-muted">{p.unit}</p>
            <ul className="dots mt-5 flex-1 text-sm">{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
            <Link href={site.installUrl} className={`btn mt-6 ${p.name === 'Pro' ? 'btn-primary' : 'btn-quiet'}`}>{p.name === 'Free' ? 'Start free' : `Choose ${p.name}`}</Link>
          </article>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-4 rounded-lg border border-line bg-subtle p-6 sm:flex-row sm:items-center sm:justify-between">
        <div><h3 className="text-h3">{rescue.name}</h3><p className="mt-1 text-sm text-muted">{rescue.body}</p></div>
        <div className="flex flex-wrap items-center gap-4">
          <p className="font-mono text-lg font-medium"><Price usd={rescue.usd} inr={rescue.inr} /></p>
          <a href={`mailto:${site.email}?subject=Deadline%20Rescue`} className="btn btn-quiet">Email us</a>
        </div>
      </div>
    </div>
  );
}
