'use client';
import { useEffect, useState } from 'react';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHidden(true);
      onDone();
    }, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--espresso)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div className="loader-logo">dusk.</div>
      <div className="loader-sub">chocolates &nbsp;·&nbsp; since 2026</div>
      <div className="loader-bar" />
      <div className="loader-since">crafted with intention</div>
    </div>
  );
}
