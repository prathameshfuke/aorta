'use client';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const toggle = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
  };
  return (
    <button type="button" onClick={toggle} className="icon-btn" aria-label="Switch between light and dark">
      <Moon size={18} aria-hidden className="dark:hidden" /><Sun size={18} aria-hidden className="hidden dark:block" />
    </button>
  );
}
