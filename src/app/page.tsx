'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Loader from '@/components/Loader';
import Ticker from '@/components/Ticker';
import ProductCard from '@/components/ProductCard';
import BagDrawer from '@/components/BagDrawer';
import Footer from '@/components/Footer';
import { PRODUCTS, GIFT_BOXES, INGREDIENTS } from '@/lib/data';
import { useCartStore } from '@/store/useCartStore';

const S = {
  lbl: { fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'0.65em', textTransform:'uppercase' as const, color:'var(--cocoa-mid)', marginBottom:'16px' },
  title: { fontFamily:"'Cormorant Garamond',serif", fontWeight:300, lineHeight:1.1, color:'var(--espresso)' },
  body: { fontFamily:"'Jost',sans-serif", fontWeight:300, lineHeight:1.85, color:'var(--text-light)' },
};

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const { addItem, openBag } = useCartStore();

  useReveal();

  const onLoaderDone = useCallback(() => {
    setLoaderDone(true);
    setTimeout(() => setHeroVisible(true), 200);
  }, []);

  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  const addGift = (name: string, price: number, details: string, emoji: string) => {
    addItem({ key: `gift-${name}`, id: 999, name, variant: details, size: 'Small Bar', price, qty: 1, emoji, image: '/images/gift-box.png' });
    openBag();
  };

  return (
    <>
      <Loader onDone={onLoaderDone} />
      <Navigation />
      <BagDrawer />

      {/* HERO */}
      <section id="hero" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', position:'relative', overflow:'hidden', background:'linear-gradient(160deg,#120400 0%,#2A1005 50%,#4A2010 100%)' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 50% at 50% 70%,rgba(196,150,58,0.07),transparent)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:2, opacity: heroVisible?1:0, transform: heroVisible?'translateY(0)':'translateY(44px)', transition:'all 1.3s cubic-bezier(0.16,1,0.3,1)', padding:'0 24px' }}>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'10px', letterSpacing:'0.65em', textTransform:'uppercase', color:'var(--cocoa-pale)', marginBottom:'28px' }}>Chennai · Est. 2026</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(80px,15vw,200px)', fontWeight:300, color:'var(--cream)', lineHeight:0.85 }}>
            dusk<em style={{ fontStyle:'italic', color:'var(--cocoa-pale)' }}>.</em>
          </h1>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(16px,2.2vw,22px)', fontWeight:300, fontStyle:'italic', color:'var(--cocoa-pale)', marginTop:'28px', letterSpacing:'0.06em' }}>
            Chocolate without guilt. Crafted with nature's finest.
          </p>
          <a href="#products" style={{ display:'inline-block', marginTop:'52px', padding:'17px 44px', border:'1px solid rgba(245,238,228,0.25)', color:'var(--cream)', textDecoration:'none', fontSize:'10px', fontWeight:400, letterSpacing:'0.45em', textTransform:'uppercase', transition:'all 0.3s', fontFamily:"'Jost',sans-serif" }}>
            Explore the Collection →
          </a>
        </div>
        <div style={{ position:'absolute', bottom:'44px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', color:'var(--cocoa-mid)', fontSize:'9px', letterSpacing:'0.45em', textTransform:'uppercase', fontFamily:"'Jost',sans-serif" }}>
          <div style={{ width:'1px', height:'44px', background:'linear-gradient(to bottom,var(--cocoa-pale),transparent)' }} className="scroll-pulse" />
          Scroll
        </div>
      </section>

      <Ticker />

      {/* PHILOSOPHY */}
      <section id="philosophy" style={{ padding:'108px 64px', background:'var(--white)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'88px', alignItems:'center' }} className="section-responsive">
        <div className="reveal-l">
          <div style={S.lbl}>Our Philosophy</div>
          <h2 style={{ ...S.title, fontSize:'clamp(38px,5.5vw,68px)' }}>Chocolate the way<br /><em style={{ fontStyle:'italic', color:'var(--cocoa)' }}>nature intended</em></h2>
          <p style={{ ...S.body, fontSize:'20px', marginTop:'28px' }}>At dusk, we believe indulgence shouldn't come with guilt. Every bar is crafted with <strong style={{ color:'var(--espresso)', fontWeight:500 }}>raw honey</strong> instead of refined sugar, and infused with <strong style={{ color:'var(--espresso)', fontWeight:500 }}>adaptogenic herbs</strong> that calm the mind rather than spike anxiety.</p>
          <p style={{ ...S.body, fontSize:'20px', marginTop:'20px' }}>We began with a simple question: <strong style={{ color:'var(--espresso)', fontWeight:500 }}>what if chocolate could actually be good for you?</strong> The answer is dusk.</p>
          <div style={{ marginTop:'36px', position:'relative', height:'280px', width:'100%', overflow:'hidden' }}>
            <Image src="/images/philosophy.png" alt="Breaking chocolate" fill style={{ objectFit:'cover' }} sizes="50vw" />
          </div>
        </div>
        <div className="reveal-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px' }}>
          {[
            { h:'No Refined Sugar', p:'Sweetened exclusively with raw honey — never processed white sugar.' },
            { h:'Adaptogenic', p:'Ashwagandha, tulsi, and calming herbs in every recipe.' },
            { h:'No Guilt', p:'Designed to nourish your body and soothe your mind.' },
            { h:'Fully Natural', p:'Zero artificial additives. What you read on the label is all that\'s inside.' },
          ].map(({ h, p }) => (
            <div key={h} style={{ background:'var(--parchment)', padding:'40px 32px', position:'relative', overflow:'hidden', transition:'background 0.3s', cursor:'default' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='var(--cocoa-deep)'; Array.from((e.currentTarget as HTMLElement).querySelectorAll('h4,p')).forEach((el: Element) => { (el as HTMLElement).style.color='var(--cream)'; }); }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='var(--parchment)'; Array.from((e.currentTarget as HTMLElement).querySelectorAll('h4')).forEach((el: Element) => { (el as HTMLElement).style.color='var(--espresso)'; }); Array.from((e.currentTarget as HTMLElement).querySelectorAll('p')).forEach((el: Element) => { (el as HTMLElement).style.color='var(--text-light)'; }); }}
            >
              <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'23px', fontWeight:400, color:'var(--espresso)', marginBottom:'10px', transition:'color 0.3s' }}>{h}</h4>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'12px', fontWeight:300, lineHeight:1.75, color:'var(--text-light)', transition:'color 0.3s' }}>{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ padding:'108px 64px', background:'var(--cream)' }}>
        <div className="reveal">
          <div style={S.lbl}>The Collection</div>
          <h2 style={{ ...S.title, fontSize:'clamp(38px,5.5vw,68px)' }}>Seven <em style={{ fontStyle:'italic', color:'var(--cocoa)' }}>expressions</em><br />of chocolate</h2>
        </div>
        <div className="reveal" style={{ display:'inline-flex', border:'1px solid var(--parchment)', margin:'48px 0 56px' }}>
          {['all','salt','floral','matcha','herbal','vanilla','coffee','nuts'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding:'13px 30px', border:'none', borderRight:'1px solid var(--parchment)', background: filter===f ? 'var(--cocoa-deep)' : 'transparent', fontFamily:"'Jost',sans-serif", fontSize:'10px', fontWeight:400, letterSpacing:'0.3em', textTransform:'uppercase', color: filter===f ? 'var(--cream)' : 'var(--text-light)', cursor:'pointer', transition:'all 0.2s' }}>
              {f === 'all' ? 'All' : f === 'salt' ? 'Salt' : f === 'floral' ? 'Floral' : f === 'matcha' ? 'Matcha' : f === 'herbal' ? 'Herbal' : f === 'vanilla' ? 'Vanilla' : f === 'coffee' ? 'Coffee' : 'Nuts'}
            </button>
          ))}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:'2px' }}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* GIFT BOXES */}
      <section id="giftboxes" style={{ padding:'108px 64px', background:'var(--cocoa-deep)' }}>
        <div className="reveal">
          <div style={{ ...S.lbl, color:'var(--cocoa-pale)' }}>Curated Gifting</div>
          <h2 style={{ ...S.title, fontSize:'clamp(38px,5.5vw,68px)', color:'var(--cream)' }}>Gift boxes <em style={{ fontStyle:'italic', color:'var(--cocoa-pale)' }}>crafted</em><br />for every occasion</h2>
        </div>
        <div style={{ marginTop:'32px', position:'relative', height:'320px', width:'100%', overflow:'hidden', marginBottom:'60px' }} className="reveal">
          <Image src="/images/gift-box.png" alt="Dusk gift box" fill style={{ objectFit:'cover' }} sizes="100vw" />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(26,10,2,0.6), transparent)' }} />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2px' }} className="gift-grid">
          {GIFT_BOXES.map((g, i) => (
            <div key={g.id} className={`reveal delay-${(i+1)*100}`} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', padding:'52px 44px', transition:'all 0.3s', position:'relative', overflow:'hidden' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.07)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.04)'; }}
            >
              <span style={{ fontSize:'52px', marginBottom:'28px', display:'block' }}>{g.emoji}</span>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'30px', fontWeight:300, color:'var(--cream)', marginBottom:'14px' }}>{g.name}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'12px', fontWeight:300, lineHeight:1.85, color:'var(--cocoa-pale)', marginBottom:'28px' }}>{g.description}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'10px', letterSpacing:'0.2em', color:'var(--cocoa-mid)', textTransform:'uppercase' }}>Starting from</div>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'40px', fontWeight:300, color:'var(--gold)', display:'block' }}>₹{g.price}</span>
              <button onClick={() => addGift(g.name, g.price, g.details, g.emoji)} style={{ display:'inline-flex', alignItems:'center', gap:'9px', marginTop:'32px', padding:'13px 30px', border:'1px solid rgba(255,255,255,0.2)', color:'var(--cream)', background:'none', fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'0.45em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='var(--cocoa-mid)'; (e.currentTarget as HTMLElement).style.borderColor='var(--cocoa-mid)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='none'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.2)'; }}
              >Add to Bag →</button>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="howitworks" style={{ padding:'108px 64px', background:'var(--parchment)' }}>
        <div className="reveal" style={{ textAlign:'center' }}>
          <div style={S.lbl}>How It Works</div>
          <h2 style={{ ...S.title, fontSize:'clamp(38px,5.5vw,68px)' }}>Order in four <em style={{ fontStyle:'italic', color:'var(--cocoa)' }}>simple</em> steps</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2px', marginTop:'68px' }} className="steps-grid">
          {[
            { n:'01', t:'Explore & Select', d:'Browse 9 unique chocolate flavours. Choose your base — dark, milk, or white — and select small bars, big bars, or gift boxes.' },
            { n:'02', t:'Add to Bag', d:'Add your chosen items to the bag. Customise quantities and variants. Review before proceeding to checkout.' },
            { n:'03', t:'Choose Payment', d:'Pay instantly via PhonePe or Google Pay (UPI). Or opt for Cash on Delivery with a small handling fee of ₹40.' },
            { n:'04', t:'Receive & Savour', d:'Packed fresh and delivered within 2–4 business days in Chennai. Pan-India orders within 5–7 business days.' },
          ].map(({ n, t, d }, i) => (
            <div key={n} className={`reveal delay-${(i+1)*100}`} style={{ background:'var(--white)', padding:'44px 36px', position:'relative' }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'68px', fontWeight:300, color:'var(--parchment)', lineHeight:1, marginBottom:'22px' }}>{n}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'24px', fontWeight:400, color:'var(--espresso)', marginBottom:'13px' }}>{t}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'12px', fontWeight:300, lineHeight:1.8, color:'var(--text-light)' }}>{d}</div>
              {i < 3 && <span style={{ position:'absolute', top:'50%', right:'-14px', transform:'translateY(-50%)', color:'var(--cocoa-pale)', fontSize:'22px', zIndex:2 }}>→</span>}
            </div>
          ))}
        </div>
      </section>

      {/* INGREDIENTS */}
      <section id="ingredients" style={{ padding:'108px 64px', background:'var(--white)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'104px', alignItems:'center' }} className="section-responsive">
          <div className="reveal-l">
            <div style={S.lbl}>What's Inside</div>
            <h2 style={{ ...S.title, fontSize:'clamp(38px,5.5vw,68px)' }}>Every ingredient<br /><em style={{ fontStyle:'italic', color:'var(--cocoa)' }}>has a purpose</em></h2>
            <p style={{ ...S.body, fontSize:'19px', marginTop:'22px' }}>We source <strong style={{ color:'var(--espresso)', fontWeight:500 }}>raw, unfiltered honey</strong> from local beekeepers to replace refined sugars entirely.</p>
            <p style={{ ...S.body, fontSize:'19px', marginTop:'16px' }}><strong style={{ color:'var(--espresso)', fontWeight:500 }}>Ashwagandha</strong> — the ancient adaptogen — is woven through our dark varieties. Tulsi, chamomile, and rose are functional ingredients with centuries of wellness behind them.</p>
            <div style={{ marginTop:'44px', padding:'34px', background:'var(--parchment)', borderLeft:'3px solid var(--cocoa)' }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'23px', fontWeight:300, fontStyle:'italic', color:'var(--espresso)', lineHeight:1.65 }}>
                "You deserve to eat chocolate that loves you back."
              </p>
            </div>
          </div>
          <div className="reveal-r">
            <div style={{ marginBottom:'32px', position:'relative', height:'260px', overflow:'hidden' }}>
              <Image src="/images/ingredients.png" alt="Natural ingredients" fill style={{ objectFit:'cover' }} sizes="50vw" />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'2px' }}>
              {INGREDIENTS.map(({ emoji, name, benefit }) => (
                <div key={name} style={{ background:'var(--parchment)', padding:'30px 22px', textAlign:'center', transition:'all 0.3s', cursor:'default' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='var(--cocoa-deep)'; Array.from((e.currentTarget as HTMLElement).querySelectorAll('div')).forEach((el: Element) => { (el as HTMLElement).style.color='var(--cream)'; }); }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='var(--parchment)'; Array.from((e.currentTarget as HTMLElement).querySelectorAll('[data-name]')).forEach((el: Element) => { (el as HTMLElement).style.color='var(--espresso)'; }); Array.from((e.currentTarget as HTMLElement).querySelectorAll('[data-benefit]')).forEach((el: Element) => { (el as HTMLElement).style.color='var(--text-light)'; }); }}
                >
                  <span style={{ fontSize:'30px', display:'block', marginBottom:'13px' }}>{emoji}</span>
                  <div data-name="1" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:400, color:'var(--espresso)', transition:'color 0.3s' }}>{name}</div>
                  <div data-benefit="1" style={{ fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'0.18em', color:'var(--text-light)', marginTop:'5px', textTransform:'uppercase', transition:'color 0.3s' }}>{benefit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT */}
      <section id="payment" style={{ padding:'108px 64px', background:'var(--cream)' }}>
        <div className="reveal" style={{ textAlign:'center' }}>
          <div style={S.lbl}>Seamless Checkout</div>
          <h2 style={{ ...S.title, fontSize:'clamp(38px,5.5vw,68px)' }}>Pay the way <em style={{ fontStyle:'italic', color:'var(--cocoa)' }}>you prefer</em></h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2px', marginTop:'60px' }} className="pay-grid">
          {[
            { logo:'PhonePe', name:'UPI · Instant', desc:'Pay instantly via PhonePe UPI. Secure, fast, and zero additional charges. Transaction confirmed in seconds.', tag:'No Extra Charge', delay:'delay-100' },
            { logo:'GPay', name:'Google Pay · UPI', desc:'Use Google Pay for a seamless UPI experience. Your order is confirmed the moment payment clears.', tag:'No Extra Charge', delay:'delay-200' },
            { logo:'COD', name:'Cash on Delivery', desc:'Pay when your order arrives. A nominal handling fee of ₹40 applies to all COD orders across India.', tag:'+ ₹40 Handling', delay:'delay-300' },
          ].map(({ logo, name, desc, tag, delay }) => (
            <div key={logo} className={`reveal ${delay}`} style={{ background:'var(--white)', padding:'52px 44px', borderTop:'3px solid transparent', transition:'border-color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderTopColor='var(--cocoa)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderTopColor='transparent'; }}
            >
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'34px', fontWeight:400, color:'var(--cocoa)', marginBottom:'18px' }}>{logo}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'10px', letterSpacing:'0.45em', textTransform:'uppercase', color:'var(--text-light)', marginBottom:'22px' }}>{name}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'12px', fontWeight:300, lineHeight:1.85, color:'var(--text-light)' }}>{desc}</div>
              <span style={{ display:'inline-block', marginTop:'18px', padding:'5px 14px', background:'var(--parchment)', fontSize:'9px', letterSpacing:'0.2em', color:'var(--cocoa)', textTransform:'uppercase', fontFamily:"'Jost',sans-serif" }}>{tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOM ORDER CTA */}
      <section id="customise" style={{ padding:'108px 64px', background:'var(--espresso)', textAlign:'center' }}>
        <div className="reveal">
          <div style={{ ...S.lbl, color:'var(--cocoa-mid)' }}>Bespoke Orders</div>
          <h2 style={{ ...S.title, fontSize:'clamp(38px,5.5vw,68px)', color:'var(--cream)' }}>Make it <em style={{ fontStyle:'italic', color:'var(--cocoa-pale)' }}>yours</em></h2>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'21px', fontWeight:300, fontStyle:'italic', color:'var(--cocoa-pale)', maxWidth:'660px', margin:'28px auto 52px', lineHeight:1.85 }}>
            Want a unique flavour combination? A custom gift message? A corporate order? We love crafting something truly personal for you.
          </p>
          <a href="https://wa.me/919043663241?text=Hi%20Dusk!%20I%E2%80%99d%20like%20a%20custom%20order." target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:'16px', padding:'21px 64px', background:'var(--cocoa-pale)', color:'var(--espresso)', textDecoration:'none', fontFamily:"'Jost',sans-serif", fontSize:'10px', letterSpacing:'0.55em', textTransform:'uppercase', fontWeight:500, transition:'all 0.3s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='var(--cream)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='var(--cocoa-pale)'; }}
          >
            Customise via WhatsApp →
          </a>
        </div>
      </section>

      {/* CONNECT */}
      <section id="connect" style={{ padding:'108px 64px', background:'var(--white)' }}>
        <div className="reveal">
          <div style={S.lbl}>Find Us</div>
          <h2 style={{ ...S.title, fontSize:'clamp(38px,5.5vw,68px)' }}>Stay <em style={{ fontStyle:'italic', color:'var(--cocoa)' }}>connected</em></h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'88px', alignItems:'start', marginTop:'68px' }} className="section-responsive">
          <div>
            {[
              { plat:'Instagram', handle:'@dusk.bites', href:'https://www.instagram.com/dusk.bites' },
              { plat:'WhatsApp', handle:'+91 90436 63241', href:'https://wa.me/919043663241' },
              { plat:'Location', handle:'Chennai, Tamil Nadu', href:'#' },
            ].map(({ plat, handle, href }) => (
              <a key={plat} href={href} target={href === '#' ? undefined : '_blank'} rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', gap:'22px', padding:'26px 0', borderBottom:'1px solid var(--parchment)', textDecoration:'none', transition:'all 0.2s' }}>
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'30px', fontWeight:300, color:'var(--espresso)' }}>{plat}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'11px', color:'var(--text-light)', letterSpacing:'0.12em', marginTop:'4px' }}>{handle}</div>
                </div>
                {href !== '#' && <span style={{ marginLeft:'auto', color:'var(--cocoa)', fontSize:'22px' }}>→</span>}
              </a>
            ))}
          </div>
          <div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'34px', fontWeight:300, color:'var(--espresso)', marginBottom:'28px' }}>Delivery Information</h3>
            {[
              { z:'Chennai (within city)', c:'₹50 · 2–3 days' },
              { z:'Tamil Nadu', c:'₹80 · 3–5 days' },
              { z:'Pan India', c:'₹120 · 5–7 days' },
              { z:'Free shipping above', c:'₹599' },
              { z:'Cash on Delivery fee', c:'+ ₹40' },
            ].map(({ z, c }) => (
              <div key={z} style={{ display:'flex', justifyContent:'space-between', padding:'17px 0', borderBottom:'1px solid var(--parchment)', fontFamily:"'Jost',sans-serif", fontSize:'12px' }}>
                <span style={{ color:'var(--text-light)' }}>{z}</span>
                <span style={{ color:'var(--espresso)', fontWeight:500 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media(max-width:860px){
          .section-responsive{grid-template-columns:1fr!important;gap:48px!important;}
          .gift-grid{grid-template-columns:1fr!important;}
          .steps-grid{grid-template-columns:1fr!important;}
          .pay-grid{grid-template-columns:1fr!important;}
          section{padding:64px 24px!important;}
        }
      `}</style>
    </>
  );
}
