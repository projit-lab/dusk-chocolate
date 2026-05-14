'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestorer() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser's native scroll restoration
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
