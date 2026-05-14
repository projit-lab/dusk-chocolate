'use client';
import Link from 'next/link';
import { DELIVERY_ZONES } from '@/lib/data';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--espresso)',
        padding: '80px 64px 64px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '64px',
          marginBottom: '64px',
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '56px',
              fontWeight: 300,
              color: 'var(--cream)',
              lineHeight: 1,
            }}
          >
            dusk.
          </div>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.45em',
              color: 'var(--cocoa-mid)',
              textTransform: 'uppercase',
              marginTop: '10px',
            }}
          >
            chocolates · crafted with intention · since 2026
          </div>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '12px',
              fontWeight: 300,
              color: 'var(--cocoa-mid)',
              marginTop: '22px',
              lineHeight: 1.8,
            }}
          >
            Premium artisanal chocolates crafted with raw honey
            and adaptogenic herbs. Chennai, India.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.55em',
              textTransform: 'uppercase',
              color: 'var(--cocoa-mid)',
              marginBottom: '28px',
            }}
          >
            Navigate
          </div>
          {[
            { label: 'Collection', href: '/#products' },
            { label: 'Gift Boxes', href: '/#giftboxes' },
            { label: 'Shop', href: '/shop' },
            { label: 'Gift Box Builder', href: '/gift-box-builder' },
            { label: 'Our Story', href: '/#ingredients' },
            { label: 'Connect', href: '/#connect' },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                display: 'block',
                fontFamily: "'Jost', sans-serif",
                fontSize: '12px',
                fontWeight: 300,
                color: 'var(--cocoa-pale)',
                textDecoration: 'none',
                marginBottom: '12px',
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--cream)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--cocoa-pale)')}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Delivery */}
        <div>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.55em',
              textTransform: 'uppercase',
              color: 'var(--cocoa-mid)',
              marginBottom: '28px',
            }}
          >
            Delivery
          </div>
          {DELIVERY_ZONES.map((z, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                fontFamily: "'Jost', sans-serif",
                fontSize: '11px',
              }}
            >
              <span style={{ color: 'var(--cocoa-mid)' }}>{z.zone}</span>
              <span style={{ color: 'var(--cocoa-pale)', fontWeight: 500 }}>{z.cost}</span>
            </div>
          ))}
          <div style={{ marginTop: '22px' }}>
            <a
              href="https://wa.me/919043663241"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '11px',
                color: 'var(--gold)',
                textDecoration: 'none',
                letterSpacing: '0.1em',
              }}
            >
              WhatsApp: +91 90436 63241
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="footer-bottom"
      >
        <span
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '10px',
            color: 'var(--cocoa-mid)',
            letterSpacing: '0.18em',
          }}
        >
          © 2026 Dusk Chocolates. Chennai, India.
        </span>
        <div style={{ display: 'flex', gap: '32px' }}>
          {[
            { label: 'Instagram', href: 'https://www.instagram.com/dusk.bites' },
            { label: 'WhatsApp', href: 'https://wa.me/919043663241' },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--cocoa-mid)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--cream)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--cocoa-mid)')}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
          footer { padding: 60px 24px 40px !important; }
        }
      `}</style>
    </footer>
  );
}
