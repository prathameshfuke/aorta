import { finalCta } from '@/content/home';
import { RepoInput } from './repo-input';
import { Install, Title, Wrap } from './ui';

export function Cta() {
  return (
    <section className="border-t border-line py-section">
      <Wrap>
        <div data-reveal className="relative overflow-hidden rounded-lg border border-line bg-surface px-5 py-14 sm:px-12">
          <div aria-hidden className="grid-bg grid-fade absolute inset-0" />
          <div className="relative">
            <Title text={finalCta.title} className="max-w-2xl" />
            <div className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
              <Install className="h-[3.375rem]" />
              <RepoInput id="repo-cta" />
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
