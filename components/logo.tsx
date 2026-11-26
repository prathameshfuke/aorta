/* eslint-disable @next/next/no-img-element */
export const BreaklineLogo = ({ className = '' }: { className?: string }) => (
  <span className={className}>
    <img src="/brand/breakline-horizontal-light.svg" alt="Breakline" width={176} height={26} className="block dark:hidden" />
    <img src="/brand/breakline-horizontal-dark.svg" alt="Breakline" width={176} height={26} className="hidden dark:block" />
  </span>
);

export const Logo = () => (
  <>
    <img src="/brand/logo-light-bg.svg" alt="" width={122} height={26} className="block dark:hidden" />
    <img src="/brand/logo-dark-bg.svg" alt="" width={122} height={26} className="hidden dark:block" />
  </>
);
