import { ArrowRight, Check, X } from 'lucide-react';
import Link from 'next/link';
import { Cta } from '@/components/cta';
import { DeadlineStrip } from '@/components/deadline-strip';
import { Diagram } from '@/components/diagram';
import { JsonLd } from '@/components/json-ld';
import { BreaklineLogo } from '@/components/logo';
import { ParityComment, PrCard } from '@/components/pr-comment';
import { PricingPlans } from '@/components/pricing-plans';
import { RepoInput } from '@/components/repo-input';
import { Terminal } from '@/components/terminal';
import { Dot, Faq, Install, Section, Title, Wrap } from '@/components/ui';
import { contrast, faq, hero, securityCards, skillBlock, steps } from '@/content/home';
import { plans, pricingNote } from '@/content/pricing';
import { site } from '@/content/site';

// One real artefact per step, in the same order as `steps`.
const artefacts = [
  <><p>app/triage.py:19</p><p className="text-warn-text">gpt-4o-2024-08-06</p><p className="text-muted">model kwarg, confidence 0.99</p></>,
  <><p className="bg-warn/10 px-2">- &quot;gpt-4o-2024-08-06&quot;</p><p className="bg-pass/10 px-2">+ &quot;gpt-5.4-mini&quot;</p><p className="px-2 text-muted">parses, policy: allow</p></>,
  <><p className="flex justify-between">schema-valid<span className="text-warn-text">80% FAIL</span></p><p className="flex justify-between">labels<span className="text-warn-text">60% FAIL</span></p><p className="flex justify-between">cost<span className="text-pass">−81% PASS</span></p></>,
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="grid-bg grid-fade absolute inset-0" />
        <Wrap className="relative pb-16 pt-10 sm:pb-24 sm:pt-20">
          <BreaklineLogo className="mb-6 block" />
          <Link href={hero.pill.href} className="inline-flex min-h-11 items-center gap-3 rounded-full border border-line bg-surface py-1 pl-4 pr-3 text-sm hover:border-control">
            <Dot live /><span>{hero.pill.text}</span><ArrowRight size={15} aria-hidden className="shrink-0" />
          </Link>
          <Title as="h1" text={hero.title} className="mt-6 max-w-[60rem]" />
          <p className="mt-6 max-w-2xl text-lg text-muted">{hero.sub}</p>
          <div className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
            <Install variant="brand" className="h-[3.375rem]" />
            <RepoInput id="repo-hero" />
          </div>
          <div className="shadow-window mt-14 grid grid-cols-1 overflow-hidden rounded-lg border border-line lg:grid-cols-[1.15fr_1fr]">
            <Terminal />
            <PrCard />
          </div>
        </Wrap>
      </section>

      <DeadlineStrip builtAt={new Date().toISOString()} />

      <Section>
        <Title text="Scan, patch, prove." />
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <li key={s.title} data-reveal className="flex min-w-0 flex-col">
              <div aria-hidden className="flex min-h-36 flex-col justify-center rounded-lg border border-line bg-surface p-4 font-mono text-xs leading-7">{artefacts[i]}</div>
              <h3 className="mt-5 text-h3">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div className="min-w-0 lg:sticky lg:top-28">
            <Title text={skillBlock.title} />
            <p className="mt-5 max-w-xl text-muted">{skillBlock.body}</p>
            <p className="mt-6 max-w-xl rounded-lg bg-code p-4 font-mono text-xs text-code-ink"><span className="text-code-dim">you  </span>{skillBlock.prompt}</p>
            <p className="mt-4 max-w-xl text-sm text-muted">{skillBlock.note}</p>
            <Link href="/docs/skill" className="link mt-4 inline-flex min-h-11 items-center">Install the skill</Link>
          </div>
          <Diagram name="workflow" />
        </div>
      </Section>

      <Section id="proof" className="bg-subtle">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Title text="Read the proof before you merge." />
            <p className="mt-5 text-muted">Breakline writes a parity report for your pull request. It replays your saved prompts on both models and names each case that changed.</p>
            <Link href="/docs/fixtures" className="link mt-4 inline-flex min-h-11 items-center">How fixtures work</Link>
          </div>
          <ParityComment />
        </div>
      </Section>

      <Section>
        <Title text={contrast.title} className="max-w-3xl" />
        <p className="mt-5 max-w-2xl text-muted">{contrast.intro}</p>
        <div data-reveal className="mt-12 grid overflow-hidden rounded-lg border border-line md:grid-cols-2">
          {[contrast.bots, contrast.breakline].map((c, i) => (
            <div key={c.title} className={`p-6 sm:p-8 ${i ? 'border-t border-line bg-surface md:border-l md:border-t-0' : 'bg-subtle'}`}>
              <h3 className={`text-h3 ${i ? '' : 'text-muted'}`}>{c.title}</h3>
              <ul className="mt-5 space-y-3">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    {i ? <Check size={18} aria-hidden className="mt-1 shrink-0 text-pass" /> : <X size={18} aria-hidden className="mt-1 shrink-0 text-muted" />}
                    <span className={i ? '' : 'text-muted'}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Title text="You stay in control." />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {securityCards.map((c) => (
            <li key={c.title} data-reveal className="rounded-lg border border-line bg-surface p-6"><h3 className="text-h3">{c.title}</h3><p className="mt-3 text-sm text-muted">{c.body}</p></li>
          ))}
        </ul>
        <Link href="/security" className="link mt-6 inline-flex min-h-11 items-center">See the data flow and permissions</Link>
      </Section>

      <Section>
        <Title text="Priced per repository." />
        <p className="mb-12 mt-5 max-w-2xl text-muted">{pricingNote}</p>
        <PricingPlans />
        <Link href="/pricing" className="link mt-6 inline-flex min-h-11 items-center">Compare plans and see INR prices</Link>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr]">
          <Title text="Questions engineers ask." />
          <Faq items={faq} />
        </div>
      </Section>

      <Cta />

      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: `${site.company} ${site.product}`, applicationCategory: 'DeveloperApplication', operatingSystem: 'macOS, Linux', description: site.description, url: site.url,
        offers: plans.map((p) => ({ '@type': 'Offer', name: p.name, price: p.usd.replace('$', ''), priceCurrency: 'USD' })),
      }} />
    </>
  );
}
