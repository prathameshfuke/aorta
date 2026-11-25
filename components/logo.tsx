/* eslint-disable @next/next/no-img-element */
export const Logo = () => (
  <>
    <img src="/brand/logo-light-bg.svg" alt="" width={122} height={26} className="block dark:hidden" />
    <img src="/brand/logo-dark-bg.svg" alt="" width={122} height={26} className="hidden dark:block" />
  </>
);
