'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Product, SIZE_MULTIPLIERS } from '@/lib/data';
import { useCartStore } from '@/store/useCartStore';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [variant, setVariant] = useState<'dark' | 'milk' | 'white'>('dark');
  const [size, setSize] = useState<'small' | 'big'>('small');
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { addItem, openBag } = useCartStore();

  const price = Math.round(product.basePrice * SIZE_MULTIPLIERS[size]);

  const handleAdd = () => {
    const key = `${product.id}-${variant}-${size}`;
    addItem({
      key,
      id: product.id,
      name: product.name,
      variant,
      size: size === 'small' ? 'Small Bar' : 'Big Bar',
      price,
      qty: 1,
      emoji: product.emoji,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <div
        style={{
          background: 'var(--white)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.4s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Image area */}
        <div
          style={{
            height: '288px',
            position: 'relative',
            overflow: 'hidden',
            background: product.bg,
            cursor: 'pointer',
          }}
          onClick={() => setShowModal(true)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.6s' }}
            sizes="(max-width: 768px) 100vw, 33vw"
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'scale(1)';
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              fontFamily: "'Jost', sans-serif",
              fontSize: '8px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              padding: '6px 14px',
              zIndex: 3,
              background: 'var(--cocoa-deep)',
              color: 'var(--cream)',
            }}
          >
            {product.badge}
          </span>
          {/* Hover overlay */}
          <div
            className="card-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(26,10,2,0.82)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              opacity: 0,
              transition: 'opacity 0.3s',
              zIndex: 4,
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              style={{
                padding: '13px 34px',
                border: '1px solid var(--cream)',
                color: 'var(--cream)',
                background: 'transparent',
                fontFamily: "'Jost', sans-serif",
                fontSize: '9px',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Quick View
            </button>
          </div>
          <style>{`
            div:hover .card-overlay { opacity: 1 !important; }
          `}</style>
        </div>

        {/* Info */}
        <div style={{ padding: '28px 28px 0' }}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '25px',
              fontWeight: 400,
              color: 'var(--espresso)',
              lineHeight: 1.2,
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '11px',
              fontWeight: 300,
              color: 'var(--text-light)',
              letterSpacing: '0.05em',
              marginTop: '7px',
              lineHeight: 1.55,
            }}
          >
            {product.ingredients}
          </div>
          {/* Variants */}
          <div style={{ display: 'flex', gap: '6px', marginTop: '16px', marginBottom: '4px' }}>
            {(['dark', 'milk', 'white'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                style={{
                  padding: '5px 13px',
                  border: '1px solid var(--parchment)',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.2em',
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
        </div>

        {/* Size */}
        <div style={{ display: 'flex', gap: '6px', padding: '0 28px', marginTop: '12px', marginBottom: '12px' }}>
          {(['small', 'big'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                padding: '5px 13px',
                border: '1px solid var(--parchment)',
                fontFamily: "'Jost', sans-serif",
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: size === s ? 'var(--parchment)' : 'none',
                borderColor: size === s ? 'var(--cocoa-mid)' : 'var(--parchment)',
                color: size === s ? 'var(--espresso)' : 'var(--text-light)',
              }}
            >
              {s === 'small' ? 'Small Bar' : 'Big Bar'}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 28px 28px',
            borderTop: '1px solid var(--parchment)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '30px',
                fontWeight: 400,
                color: 'var(--espresso)',
              }}
            >
              ₹{price}
            </div>
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '9px',
                color: 'var(--text-light)',
                marginTop: '3px',
                letterSpacing: '0.1em',
              }}
            >
              per bar · all natural
            </div>
          </div>
          <button
            onClick={handleAdd}
            style={{
              padding: '13px 26px',
              background: added ? 'var(--gold)' : 'var(--cocoa-deep)',
              color: added ? 'var(--espresso)' : 'var(--cream)',
              border: 'none',
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
          >
            {added ? 'Added ✓' : 'Add to Bag'}
          </button>
        </div>
      </div>

      {showModal && (
        <QuickViewModal
          product={product}
          onClose={() => setShowModal(false)}
          onAddAndOpen={() => {
            handleAdd();
            setShowModal(false);
            openBag();
          }}
        />
      )}
    </>
  );
}
