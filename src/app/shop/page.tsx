'use client';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import BagDrawer from '@/components/BagDrawer';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/lib/data';

const CATEGORIES = ['all','dark','milk','white','coffee','almond'];
const SORTS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low → High', value: 'asc' },
  { label: 'Price: High → Low', value: 'desc' },
];

export default function ShopPage() {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');

  let products = filter === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === filter);
  if (sort === 'asc') products.sort((a, b) => a.basePrice - b.basePrice);
  if (sort === 'desc') products.sort((a, b) => b.basePrice - a.basePrice);

  return (
    <>
      <Navigation />
      <BagDrawer />

      {/* Header */}
      <div style={{ background: 'var(--espresso)', paddingTop: '140px', paddingBottom: '80px', paddingLeft: '64px', paddingRight: '64px' }}>
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'0.65em', textTransform:'uppercase', color:'var(--cocoa-mid)', marginBottom:'16px' }}>The Full Collection</div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(48px,8vw,96px)', fontWeight:300, color:'var(--cream)', lineHeight:0.9 }}>
          Shop <em style={{ fontStyle:'italic', color:'var(--cocoa-pale)' }}>all</em><br />chocolates
        </h1>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'13px', fontWeight:300, color:'var(--cocoa-mid)', marginTop:'22px', maxWidth:'480px', lineHeight:1.8 }}>
          Nine artisanal flavours. Three chocolate bases. Small bars, big bars, and gift boxes — all crafted with raw honey and adaptogenic herbs.
        </p>
      </div>

      {/* Filters */}
      <div style={{ background:'var(--parchment)', padding:'24px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid var(--cocoa-pale)', flexWrap:'wrap', gap:'16px' }}>
        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{ padding:'8px 20px', border:'1px solid var(--parchment)', background: filter===c ? 'var(--cocoa-deep)' : 'var(--white)', color: filter===c ? 'var(--cream)' : 'var(--text-light)', fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.2s' }}>
              {c.charAt(0).toUpperCase()+c.slice(1)}
            </button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ padding:'10px 18px', border:'1px solid var(--parchment)', background:'var(--white)', fontFamily:"'Jost',sans-serif", fontSize:'10px', color:'var(--espresso)', letterSpacing:'0.15em', outline:'none', cursor:'pointer' }}>
          {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Count */}
      <div style={{ background:'var(--cream)', padding:'20px 64px', borderBottom:'1px solid var(--parchment)' }}>
        <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'10px', letterSpacing:'0.2em', color:'var(--text-light)', textTransform:'uppercase' }}>
          {products.length} product{products.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      <div style={{ background:'var(--cream)', padding:'2px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:'2px' }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      <Footer />
      <style>{`@media(max-width:860px){div[style*="padding:'24px 64px'"]{padding:16px 24px!important;}div[style*="paddingLeft:'64px'"]{padding-left:24px!important;padding-right:24px!important;}}`}</style>
    </>
  );
}
