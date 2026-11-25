import { Check, Minus } from 'lucide-react';
import { PricingPlans } from '@/components/pricing-plans';
import { Faq, PageHead, Section, Title, Wrap } from '@/components/ui';
import { comparison, plans, pricingFaq } from '@/content/pricing';
import { pageMeta } from '@/lib/meta';

const intro = 'Start free on public repositories. Pay when you want Breakline to watch private ones.';
export const metadata = pageMeta('/pricing', 'Pricing', intro);

export default function Pricing() {
  return (
    <>
      <PageHead title="Pay for the repos you protect." intro={intro} />
      <Wrap className="py-12 sm:py-16"><h2 className="sr-only">Plans</h2><PricingPlans toggle /></Wrap>
      <Section>
        <Title text="Compare plans." />
        <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-surface" tabIndex={0} role="region" aria-label="Plan comparison">
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-subtle">
              <tr><th scope="col" className="px-3 py-3 text-left font-medium sm:px-4">Feature</th>{plans.map((p) => <th key={p.name} scope="col" className="px-2 py-3 font-medium sm:px-4">{p.name}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-line">
              {comparison.map((r) => (
                <tr key={r.feature}>
                  <th scope="row" className="px-3 py-3 text-left font-normal sm:px-4">{r.feature}</th>
                  {r.in.map((v, i) => (
                    <td key={i} className="px-2 py-3 text-center sm:px-4">
                      {v === true ? <><Check size={18} aria-hidden className="mx-auto text-pass" /><span className="sr-only">Included</span></>
                        : v === false ? <><Minus size={18} aria-hidden className="mx-auto text-muted" /><span className="sr-only">Not included</span></> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr]"><Title text="Pricing questions." /><Faq items={pricingFaq} /></div>
      </Section>
    </>
  );
}
