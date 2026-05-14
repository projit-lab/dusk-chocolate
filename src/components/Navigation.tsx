'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { toggleBag, totalCount } = useCartStore();
  const count = totalCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '18px 64px' : '28px 64px',
        zIndex: 100,
        background: scrolled ? 'rgba(245,238,228,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--parchment)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '30px',
          fontWeight: 400,
          color: 'var(--espresso)',
          textDecoration: 'none',
          letterSpacing: '0.04em',
        }}
      >
        dusk<span style={{ color: 'var(--cocoa)' }}>.</span>
      </Link>

      <ul
        style={{
          display: 'flex',
          gap: '44px',
          listStyle: 'none',
        }}
        className="nav-links-desktop"
      >
        {[
          { label: 'Collection', href: '/#products' },
          { label: 'Gift Boxes', href: '/#giftboxes' },
          { label: 'Our Story', href: '/#ingredients' },
          { label: 'Shop', href: '/shop' },
          { label: 'Connect', href: '/#connect' },
        ].map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--espresso)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--cocoa)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--espresso)')}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={toggleBag}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '9px',
          cursor: 'pointer',
          fontFamily: "'Jost', sans-serif",
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          background: 'none',
          border: 'none',
          color: 'var(--espresso)',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--cocoa)')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--espresso)')}
      >
        Bag
        <span
          style={{
            background: 'var(--cocoa-deep)',
            color: 'var(--cream)',
            borderRadius: '50%',
            width: '22px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 500,
            transition: 'transform 0.2s',
            transform: count > 0 ? 'scale(1.15)' : 'scale(1)',
          }}
        >
          {count}
        </span>
      </button>

      <style>{`
        @media (max-width: 860px) {
          .nav-links-desktop { display: none !important; }
          nav { padding: 20px 24px !important; }
        }
      `}</style>
    </nav>
  );
}
