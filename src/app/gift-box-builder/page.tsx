'use client';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import BagDrawer from '@/components/BagDrawer';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/lib/data';
import { useCartStore } from '@/store/useCartStore';

const BOX_SIZES = [
  { bars: 3, name: 'The Essential', price: 349 },
  { bars: 5, name: 'The Curator', price: 549 },
  { bars: 9, name: 'The Grand Dusk', price: 899 },
];

type Slot = { productId: number; base: 'dark' | 'milk' | 'white' } | null;

export default function GiftBoxBuilderPage() {
  const [step, setStep] = useState(1);
  const [boxSize, setBoxSize] = useState<3|5|9>(3);
  const [slots, setSlots] = useState<Slot[]>(Array(3).fill(null));
  const [note, setNote] = useState('');
  const [built, setBuilt] = useState(false);
  const { addItem, openBag } = useCartStore();

  const boxConfig = BOX_SIZES.find(b => b.bars === boxSize)!;
  const filled = slots.filter(Boolean).length;

  const handleBoxSize = (bars: 3|5|9) => {
    setBoxSize(bars);
    setSlots(Array(bars).fill(null));
    setStep(2);
  };

  const selectProduct = (slotIdx: number, productId: number) => {
    const updated = [...slots];
    updated[slotIdx] = { productId, base: updated[slotIdx]?.base ?? 'dark' };
    setSlots(updated);
  };

  const selectBase = (slotIdx: number, base: 'dark' | 'milk' | 'white') => {
    const updated = [...slots];
    if (updated[slotIdx]) updated[slotIdx] = { ...updated[slotIdx]!, base };
    setSlots(updated);
  };

  const handleAdd = () => {
    const names = slots.map(s => s ? `${PRODUCTS.find(p => p.id === s.productId)?.name} (${s.base})` : '').filter(Boolean).join(', ');
    addItem({
      key: `gift-builder-${Date.now()}`,
      id: 999,
      name: `${boxConfig.name} Gift Box`,
      variant: names,
      size: 'Small Bar',
      price: boxConfig.price,
      qty: 1,
      emoji: '🎁',
      image: '/images/gift-box.png',
    });
    setBuilt(true);
    openBag();
  };

  const lbl = { fontFamily:"'Jost',sans-serif" as const, fontSize:'9px', letterSpacing:'0.65em', textTransform:'uppercase' as const, color:'var(--cocoa-mid)' };

  return (
    <>
      <Navigation />
      <BagDrawer />

      {/* Header */}
      <div style={{ background:'var(--espresso)', paddingTop:'140px', paddingBottom:'80px', padding:'140px 64px 80px', textAlign:'center' }}>
        <div style={{ ...lbl, marginBottom:'16px' }}>Bespoke Gifting</div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(48px,8vw,96px)', fontWeight:300, color:'var(--cream)', lineHeight:0.9 }}>
          Build your <em style={{ fontStyle:'italic', color:'var(--cocoa-pale)' }}>gift box</em>
        </h1>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'13px', fontWeight:300, color:'var(--cocoa-mid)', marginTop:'22px', lineHeight:1.8 }}>
          Choose your box size, pick your flavours, and add a personal note.
        </p>
      </div>

      {/* Steps indicator */}
      <div style={{ background:'var(--parchment)', padding:'20px 64px', display:'flex', gap:'8px', alignItems:'center', justifyContent:'center' }}>
        {['Box Size','Your Flavours','Gift Note','Add to Bag'].map((s, i) => (
          <div key={s} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <span style={{ width:'28px', height:'28px', borderRadius:'50%', background: step > i+1 ? 'var(--cocoa)' : step === i+1 ? 'var(--cocoa-deep)' : 'var(--parchment)', border:'1px solid var(--cocoa-mid)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Jost',sans-serif", fontSize:'11px', color: step >= i+1 ? 'var(--cream)' : 'var(--text-light)' }}>{i+1}</span>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'0.25em', textTransform:'uppercase', color: step === i+1 ? 'var(--espresso)' : 'var(--text-light)' }}>{s}</span>
            {i < 3 && <span style={{ color:'var(--cocoa-pale)', margin:'0 8px' }}>→</span>}
          </div>
        ))}
      </div>

      <div style={{ background:'var(--cream)', minHeight:'60vh', padding:'64px' }}>

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ maxWidth:'900px', margin:'0 auto' }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'38px', fontWeight:300, color:'var(--espresso)', marginBottom:'12px' }}>Choose your box size</h2>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'12px', color:'var(--text-light)', marginBottom:'44px', lineHeight:1.8 }}>All boxes include free gift wrapping and a handwritten note option.</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2px' }} className="box-grid">
              {BOX_SIZES.map(b => (
                <button key={b.bars} onClick={() => handleBoxSize(b.bars as 3|5|9)}
                  style={{ background:'var(--white)', border: boxSize===b.bars ? '2px solid var(--cocoa)' : '2px solid transparent', padding:'52px 40px', textAlign:'left', cursor:'pointer', transition:'all 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget).style.borderColor='var(--cocoa-mid)'; }}
                  onMouseLeave={e => { (e.currentTarget).style.borderColor = boxSize===b.bars ? 'var(--cocoa)' : 'transparent'; }}
                >
                  <div style={{ fontSize:'44px', marginBottom:'20px' }}>{b.bars === 3 ? '🎁' : b.bars === 5 ? '✨' : '👑'}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'28px', fontWeight:300, color:'var(--espresso)', marginBottom:'10px' }}>{b.name}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'11px', color:'var(--text-light)', marginBottom:'22px' }}>{b.bars} bars of your choice</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'36px', fontWeight:300, color:'var(--cocoa)' }}>₹{b.price}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'44px' }}>
              <div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'38px', fontWeight:300, color:'var(--espresso)', marginBottom:'8px' }}>Select your {boxSize} flavours</h2>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'12px', color:'var(--text-light)' }}>{filled} of {boxSize} selected</p>
              </div>
              {filled === boxSize && <button onClick={() => setStep(3)} style={{ padding:'13px 30px', background:'var(--cocoa-deep)', color:'var(--cream)', border:'none', fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'0.4em', textTransform:'uppercase', cursor:'pointer' }}>Next →</button>}
            </div>
            {/* Slots */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'16px', marginBottom:'44px' }}>
              {slots.map((slot, idx) => (
                <div key={idx} style={{ background:'var(--white)', padding:'24px', border:`1px solid ${slot ? 'var(--cocoa-mid)' : 'var(--parchment)'}` }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'0.35em', textTransform:'uppercase', color:'var(--cocoa-mid)', marginBottom:'12px' }}>Slot {idx+1}</div>
                  {slot ? (
                    <>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', color:'var(--espresso)', marginBottom:'12px' }}>{PRODUCTS.find(p => p.id === slot.productId)?.name}</div>
                      <div style={{ display:'flex', gap:'6px' }}>
                        {(['dark','milk','white'] as const).map(b => (
                          <button key={b} onClick={() => selectBase(idx, b)} style={{ padding:'4px 10px', border:'1px solid var(--parchment)', background: slot.base===b ? 'var(--cocoa-deep)' : 'none', color: slot.base===b ? 'var(--cream)' : 'var(--text-light)', fontFamily:"'Jost',sans-serif", fontSize:'8px', letterSpacing:'0.2em', textTransform:'uppercase', cursor:'pointer' }}>{b}</button>
                        ))}
                      </div>
                      <button onClick={() => { const u=[...slots]; u[idx]=null; setSlots(u); }} style={{ marginTop:'12px', background:'none', border:'none', fontFamily:"'Jost',sans-serif", fontSize:'10px', color:'var(--cocoa-pale)', cursor:'pointer' }}>Remove</button>
                    </>
                  ) : (
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'16px', fontStyle:'italic', color:'var(--cocoa-pale)' }}>Choose a flavour below</div>
                  )}
                </div>
              ))}
            </div>
            {/* Product selector */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:'2px' }}>
              {PRODUCTS.map(p => (
                <button key={p.id} onClick={() => { const emptyIdx = slots.findIndex(s => !s); if (emptyIdx >= 0) selectProduct(emptyIdx, p.id); }}
                  style={{ background:'var(--white)', padding:'20px', border:`1px solid ${slots.some(s=>s?.productId===p.id) ? 'var(--cocoa)' : 'transparent'}`, cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget).style.borderColor='var(--cocoa-mid)'; }}
                  onMouseLeave={e => { (e.currentTarget).style.borderColor = slots.some(s=>s?.productId===p.id) ? 'var(--cocoa)' : 'transparent'; }}
                >
                  <div style={{ fontSize:'32px', marginBottom:'8px' }}>{p.emoji}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'16px', color:'var(--espresso)', lineHeight:1.2 }}>{p.name}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'9px', color:'var(--text-light)', marginTop:'4px' }}>₹{p.basePrice}</div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} style={{ marginTop:'32px', background:'none', border:'none', fontFamily:"'Jost',sans-serif", fontSize:'10px', letterSpacing:'0.25em', color:'var(--text-light)', cursor:'pointer' }}>← Back</button>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div style={{ maxWidth:'640px', margin:'0 auto' }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'38px', fontWeight:300, color:'var(--espresso)', marginBottom:'12px' }}>Add a gift note</h2>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'12px', color:'var(--text-light)', marginBottom:'36px', lineHeight:1.8 }}>Your handwritten note will be included in the box. Max 100 characters.</p>
            <textarea
              value={note} onChange={e => setNote(e.target.value.slice(0,100))}
              placeholder="e.g. Happy Birthday! Wishing you all the sweetness in the world. 🍫"
              style={{ width:'100%', height:'140px', padding:'18px', border:'1px solid var(--parchment)', background:'var(--white)', fontFamily:"'Cormorant Garamond',serif", fontSize:'18px', color:'var(--espresso)', outline:'none', resize:'none', lineHeight:1.7 }}
            />
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'10px', color:'var(--text-light)', marginTop:'8px', textAlign:'right' }}>{note.length}/100</div>
            <div style={{ display:'flex', gap:'12px', marginTop:'32px' }}>
              <button onClick={() => setStep(2)} style={{ padding:'13px 30px', background:'none', border:'1px solid var(--parchment)', color:'var(--text-light)', fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'0.4em', textTransform:'uppercase', cursor:'pointer' }}>← Back</button>
              <button onClick={() => setStep(4)} style={{ flex:1, padding:'13px 30px', background:'var(--cocoa-deep)', color:'var(--cream)', border:'none', fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'0.4em', textTransform:'uppercase', cursor:'pointer' }}>Review Order →</button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div style={{ maxWidth:'640px', margin:'0 auto' }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'38px', fontWeight:300, color:'var(--espresso)', marginBottom:'36px' }}>Review your box</h2>
            <div style={{ background:'var(--white)', padding:'36px' }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'26px', fontWeight:300, color:'var(--espresso)', marginBottom:'22px' }}>{boxConfig.name}</div>
              {slots.map((s, i) => s && (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid var(--parchment)', fontFamily:"'Jost',sans-serif", fontSize:'12px' }}>
                  <span style={{ color:'var(--espresso)' }}>{PRODUCTS.find(p=>p.id===s.productId)?.name}</span>
                  <span style={{ color:'var(--text-light)', textTransform:'uppercase', letterSpacing:'0.2em', fontSize:'10px' }}>{s.base}</span>
                </div>
              ))}
              {note && (
                <div style={{ marginTop:'22px', padding:'16px', background:'var(--parchment)', fontFamily:"'Cormorant Garamond',serif", fontSize:'16px', fontStyle:'italic', color:'var(--cocoa)', lineHeight:1.6 }}>"{note}"</div>
              )}
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:'28px', alignItems:'baseline' }}>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'10px', letterSpacing:'0.35em', textTransform:'uppercase', color:'var(--text-light)' }}>Total</span>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'38px', fontWeight:300, color:'var(--espresso)' }}>₹{boxConfig.price}</span>
              </div>
            </div>
            {!built ? (
              <div style={{ display:'flex', gap:'12px', marginTop:'24px' }}>
                <button onClick={() => setStep(3)} style={{ padding:'13px 30px', background:'none', border:'1px solid var(--parchment)', color:'var(--text-light)', fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'0.4em', textTransform:'uppercase', cursor:'pointer' }}>← Back</button>
                <button onClick={handleAdd} style={{ flex:1, padding:'19px', background:'var(--cocoa-deep)', color:'var(--cream)', border:'none', fontFamily:"'Jost',sans-serif", fontSize:'10px', letterSpacing:'0.55em', textTransform:'uppercase', cursor:'pointer' }}>Add to Bag →</button>
              </div>
            ) : (
              <div style={{ marginTop:'24px', padding:'22px', background:'var(--parchment)', textAlign:'center', fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', color:'var(--cocoa)' }}>🎉 Added to your bag!</div>
            )}
          </div>
        )}
      </div>

      <Footer />
      <style>{`
        @media(max-width:860px){
          .box-grid{grid-template-columns:1fr!important;}
          div[style*="padding:'64px'"]{padding:32px 24px!important;}
        }
      `}</style>
    </>
  );
}
