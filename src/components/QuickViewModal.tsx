'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Product, SIZE_MULTIPLIERS } from '@/lib/data';
import { useCartStore } from '@/store/useCartStore';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddAndOpen: () => void;
}

export default function QuickViewModal({ product, onClose, onAddAndOpen }: QuickViewModalProps) {
  const [variant, setVariant] = useState<'dark' | 'milk' | 'white'>('dark');
  const [size, setSize] = useState<'small' | 'big'>('small');
  const { addItem } = useCartStore();

  const price = Math.round(product.basePrice * SIZE_MULTIPLIERS[size]);

  const handleClose = useCallback((e?: React.MouseEvent) => {
    if (!e || e.target === e.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,10,2,0.78)',
        zIndex: 995,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(7px)',
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--white)',
          width: '940px',
          maxWidth: '96vw',
          maxHeight: '92vh',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
        className="modal-grid"
      >
        {/* Visual */}
        <div
          style={{
            minHeight: '520px',
            position: 'relative',
            background: product.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="50vw"
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '22px',
              right: '22px',
              background: 'rgba(253,250,246,0.15)',
              border: 'none',
              width: '42px',
              height: '42px',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cream)',
              zIndex: 5,
              transition: 'all 0.2s',
              backdropFilter: 'blur(4px)',
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '64px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: "'Jost', sans-serif",
              fontSize: '8px',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              padding: '7px 18px',
              background: 'var(--parchment)',
              color: 'var(--cocoa)',
              marginBottom: '18px',
              width: 'fit-content',
            }}
          >
            {product.category.toUpperCase()}
          </span>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '44px',
              fontWeight: 300,
              color: 'var(--espresso)',
              lineHeight: 1.1,
            }}
          >
            {product.name}
          </h2>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '11px',
              color: 'var(--text-light)',
              letterSpacing: '0.1em',
              marginTop: '9px',
            }}
          >
            {product.ingredients}
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '18px',
              fontWeight: 300,
              lineHeight: 1.85,
              color: 'var(--text-light)',
              marginTop: '26px',
            }}
          >
            {product.description}
          </p>

          {/* Chocolate Base */}
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.44em',
              textTransform: 'uppercase',
              color: 'var(--cocoa-mid)',
              marginTop: '30px',
              marginBottom: '11px',
            }}
          >
            Chocolate Base
          </div>
          <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
            {(['dark', 'milk', 'white'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                style={{
                  padding: '7px 17px',
                  border: '1px solid var(--parchment)',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: variant === v ? 'var(--cocoa-deep)' : 'none',
                  borderColor: variant === v ? 'var(--cocoa-deep)' : 'var(--parchment)',
                  color: variant === v ? 'var(--cream)' : 'var(--text-light)',
                }}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          {/* Size */}
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.44em',
              textTransform: 'uppercase',
              color: 'var(--cocoa-mid)',
              marginTop: '24px',
              marginBottom: '11px',
            }}
          >
            Size
          </div>
          <div style={{ display: 'flex', gap: '7px' }}>
            {([
              { key: 'small', label: `Small Bar — ₹${product.basePrice}` },
              { key: 'big', label: `Big Bar — ₹${Math.round(product.basePrice * 1.6)}` },
            ] as const).map((s) => (
              <button
                key={s.key}
                onClick={() => setSize(s.key)}
                style={{
                  padding: '7px 17px',
                  border: '1px solid var(--parchment)',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: size === s.key ? 'var(--cocoa-deep)' : 'none',
                  borderColor: size === s.key ? 'var(--cocoa-deep)' : 'var(--parchment)',
                  color: size === s.key ? 'var(--cream)' : 'var(--text-light)',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Price */}
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '46px',
              fontWeight: 300,
              color: 'var(--espresso)',
              marginTop: '30px',
            }}
          >
            ₹{price}
          </div>

          <button
            onClick={onAddAndOpen}
            style={{
              width: '100%',
              padding: '19px',
              background: 'var(--cocoa-deep)',
              color: 'var(--cream)',
              border: 'none',
              fontFamily: "'Jost', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.55em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginTop: '22px',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = 'var(--cocoa)')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = 'var(--cocoa-deep)')}
          >
            Add to Bag
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .modal-grid { grid-template-columns: 1fr !important; }
          .modal-grid > div:first-child { min-height: 280px !important; }
          .modal-grid > div:last-child { padding: 32px 28px !important; }
        }
      `}</style>
    </div>
  );
}
