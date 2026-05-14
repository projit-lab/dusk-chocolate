'use client';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';

interface CheckoutModalProps {
  onClose: () => void;
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const { items, subtotal, clearCart } = useCartStore();
  const [payMethod, setPayMethod] = useState<'phonepe' | 'gpay' | 'cod'>('phonepe');
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', pin: '' });

  const sub = subtotal();
  const codFee = payMethod === 'cod' ? 40 : 0;
  const total = sub + codFee;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handlePlace = () => {
    if (!form.firstName || !form.phone || !form.address) {
      alert('Please fill in your name, phone, and address.');
      return;
    }
    setPlaced(true);
    clearCart();
    setTimeout(() => {
      const msg = encodeURIComponent(`Hi Dusk! 🍫 I just placed an order for ₹${total} via your website. Name: ${form.firstName} ${form.lastName}. Phone: ${form.phone}. Address: ${form.address}, ${form.city} - ${form.pin}. Payment: ${payMethod.toUpperCase()}.`);
      window.open(`https://wa.me/919043663241?text=${msg}`, '_blank');
    }, 1500);
  };

  if (placed) {
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,10,2,0.82)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(9px)', padding: '20px' }}>
        <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--white)', width: '520px', maxWidth: '96vw', padding: '64px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '60px', lineHeight: 1 }}>🎉</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', fontWeight: 300, color: 'var(--espresso)', marginTop: '22px' }}>Order Placed!</h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '12px', fontWeight: 300, color: 'var(--text-light)', marginTop: '16px', lineHeight: 1.8 }}>
            Thank you, {form.firstName}. Your order is confirmed.<br />
            We are opening WhatsApp to send you a confirmation.
          </p>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: 'var(--cocoa)', marginTop: '22px' }}>₹{total}</div>
          <button onClick={onClose} style={{ marginTop: '32px', padding: '15px 40px', background: 'var(--cocoa-deep)', color: 'var(--cream)', border: 'none', fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '0.45em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,10,2,0.82)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(9px)', padding: '20px' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--white)', width: '620px', maxWidth: '96vw', maxHeight: '92vh', overflowY: 'auto', padding: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '44px' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', fontWeight: 300, color: 'var(--espresso)' }}>Checkout</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '26px', cursor: 'pointer', color: 'var(--espresso)', lineHeight: 1 }}>✕</button>
        </div>

        {/* Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          {[
            { key: 'firstName', label: 'First Name', placeholder: 'Aanya' },
            { key: 'lastName', label: 'Last Name', placeholder: 'Sharma' },
          ].map(({ key, label, placeholder }) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <label style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--cocoa-mid)' }}>{label}</label>
              <input
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                style={{ padding: '15px 18px', border: '1px solid var(--parchment)', background: 'var(--cream)', fontFamily: "'Jost', sans-serif", fontSize: '13px', color: 'var(--espresso)', outline: 'none' }}
              />
            </div>
          ))}
        </div>

        {[
          { key: 'email', label: 'Email Address', placeholder: 'you@email.com', type: 'email' },
          { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
          { key: 'address', label: 'Delivery Address', placeholder: 'Street, Area, Landmark', type: 'text' },
        ].map(({ key, label, placeholder, type }) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '16px' }}>
            <label style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--cocoa-mid)' }}>{label}</label>
            <input
              type={type}
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              style={{ padding: '15px 18px', border: '1px solid var(--parchment)', background: 'var(--cream)', fontFamily: "'Jost', sans-serif", fontSize: '13px', color: 'var(--espresso)', outline: 'none' }}
            />
          </div>
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          {[
            { key: 'city', label: 'City', placeholder: 'Chennai' },
            { key: 'pin', label: 'PIN Code', placeholder: '600001' },
          ].map(({ key, label, placeholder }) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <label style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--cocoa-mid)' }}>{label}</label>
              <input
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                style={{ padding: '15px 18px', border: '1px solid var(--parchment)', background: 'var(--cream)', fontFamily: "'Jost', sans-serif", fontSize: '13px', color: 'var(--espresso)', outline: 'none' }}
              />
            </div>
          ))}
        </div>

        {/* Payment */}
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--cocoa-mid)', marginBottom: '13px', marginTop: '10px' }}>Payment Method</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '9px', marginBottom: '16px' }}>
          {([
            { key: 'phonepe', icon: '📱', label: 'PhonePe' },
            { key: 'gpay', icon: '💳', label: 'Google Pay' },
            { key: 'cod', icon: '💵', label: 'Cash on Delivery' },
          ] as const).map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setPayMethod(key)}
              style={{
                padding: '18px',
                border: payMethod === key ? '1px solid var(--cocoa)' : '1px solid var(--parchment)',
                background: payMethod === key ? 'var(--parchment)' : 'none',
                textAlign: 'center',
                cursor: 'pointer',
                fontFamily: "'Jost', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.22em',
                color: payMethod === key ? 'var(--espresso)' : 'var(--text-light)',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '26px', display: 'block', marginBottom: '9px' }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {payMethod === 'cod' && (
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', color: 'var(--text-light)', marginBottom: '16px', padding: '12px 16px', background: 'var(--parchment)' }}>
            A handling fee of ₹40 applies to Cash on Delivery orders.
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '18px' }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--text-light)', alignSelf: 'center' }}>Order Total</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '34px', fontWeight: 300, color: 'var(--espresso)' }}>₹{total}</span>
        </div>

        <button
          onClick={handlePlace}
          style={{ width: '100%', padding: '21px', background: 'var(--cocoa-deep)', color: 'var(--cream)', border: 'none', fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '0.55em', textTransform: 'uppercase', cursor: 'pointer', marginTop: '34px', transition: 'background 0.3s' }}
          onMouseEnter={(e) => ((e.currentTarget).style.background = 'var(--cocoa)')}
          onMouseLeave={(e) => ((e.currentTarget).style.background = 'var(--cocoa-deep)')}
        >
          Place Order →
        </button>
      </div>
    </div>
  );
}
