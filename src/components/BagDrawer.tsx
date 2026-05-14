'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import CheckoutModal from './CheckoutModal';

export default function BagDrawer() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { items, isOpen, closeBag, changeQty, removeItem, subtotal } = useCartStore();

  useEffect(() => {
    document.body.style.overflow = isOpen || checkoutOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, checkoutOpen]);

  const sub = subtotal();

  return (
    <>
      <div onClick={closeBag} style={{ position: 'fixed', inset: 0, background: 'rgba(26,10,2,0.55)', zIndex: 998, opacity: isOpen ? 1 : 0, visibility: isOpen ? 'visible' : 'hidden', transition: 'all 0.3s', backdropFilter: 'blur(5px)' }} />
      <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '460px', background: 'var(--white)', zIndex: 999, transform: isOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)', display: 'flex', flexDirection: 'column', maxWidth: '100vw' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '36px 44px 26px', borderBottom: '1px solid var(--parchment)' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', fontWeight: 300, color: 'var(--espresso)' }}>Your Bag</div>
          <button onClick={closeBag} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--espresso)', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '26px 44px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '88px 0', fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 300, color: 'var(--cocoa-pale)', fontStyle: 'italic' }}>Your bag is beautifully empty.</div>
          ) : items.map((item) => (
            <div key={item.key} style={{ display: 'flex', gap: '18px', padding: '22px 0', borderBottom: '1px solid var(--parchment)' }}>
              <div style={{ width: '76px', height: '76px', background: 'var(--parchment)', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="76px" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '19px', fontWeight: 400, color: 'var(--espresso)' }}>{item.name}</div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: 'var(--text-light)', marginTop: '5px', letterSpacing: '0.1em' }}>{item.variant} · {item.size}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'var(--espresso)', marginTop: '9px' }}>₹{item.price * item.qty}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '13px', marginTop: '9px' }}>
                  <button onClick={() => changeQty(item.key, -1)} style={{ width: '30px', height: '30px', border: '1px solid var(--parchment)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: 'var(--espresso)' }}>−</button>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '13px', color: 'var(--espresso)', minWidth: '22px', textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => changeQty(item.key, 1)} style={{ width: '30px', height: '30px', border: '1px solid var(--parchment)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: 'var(--espresso)' }}>+</button>
                  <button onClick={() => removeItem(item.key)} style={{ background: 'none', border: 'none', color: 'var(--cocoa-pale)', cursor: 'pointer', fontSize: '11px', marginLeft: 'auto', fontFamily: "'Jost', sans-serif", letterSpacing: '0.12em' }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '26px 44px 44px', borderTop: '1px solid var(--parchment)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '9px' }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--text-light)' }}>Subtotal</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', fontWeight: 400, color: 'var(--espresso)' }}>₹{sub}</span>
            </div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: 'var(--text-light)', marginTop: '5px' }}>
              {sub >= 599 ? '🎉 Free shipping applied!' : `Add ₹${599 - sub} more for free shipping`}
            </div>
            <button
              onClick={() => { closeBag(); setCheckoutOpen(true); }}
              style={{ width: '100%', padding: '19px', background: 'var(--cocoa-deep)', color: 'var(--cream)', border: 'none', fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '0.55em', textTransform: 'uppercase', cursor: 'pointer', marginTop: '26px', transition: 'background 0.3s' }}
              onMouseEnter={(e) => ((e.currentTarget).style.background = 'var(--cocoa)')}
              onMouseLeave={(e) => ((e.currentTarget).style.background = 'var(--cocoa-deep)')}
            >
              Proceed to Checkout →
            </button>
            <div style={{ display: 'flex', gap: '13px', marginTop: '18px', justifyContent: 'center' }}>
              {['PhonePe', 'GPay', 'COD'].map((m) => (
                <span key={m} style={{ padding: '7px 15px', background: 'var(--parchment)', fontFamily: "'Jost', sans-serif", fontSize: '9px', color: 'var(--text-light)', letterSpacing: '0.15em' }}>{m}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {checkoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} />}
    </>
  );
}
