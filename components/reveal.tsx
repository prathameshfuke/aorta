'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Adds `.in` to [data-reveal] elements as they enter the viewport. */
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
