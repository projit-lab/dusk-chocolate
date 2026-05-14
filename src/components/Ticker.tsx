'use client';

const TICKER_ITEMS = [
  'Honey Sweetened', '·', 'Ashwagandha Infused', '·',
  'Guilt-Free Indulgence', '·', 'Natural Ingredients Only', '·',
  'Anxiety Reducing Herbs', '·', 'Small Batch Crafted', '·',
  'Chennai Made', '·', 'Honey Sweetened', '·', 'Ashwagandha Infused', '·',
  'Guilt-Free Indulgence', '·', 'Natural Ingredients Only', '·',
  'Anxiety Reducing Herbs', '·', 'Small Batch Crafted', '·', 'Chennai Made', '·',
];

export default function Ticker() {
  return (
    <div
      style={{
        background: 'var(--cocoa-deep)',
        padding: '15px 0',
        overflow: 'hidden',
      }}
    >
      <div
        className="ticker-inner"
        style={{
          display: 'flex',
          gap: '64px',
          whiteSpace: 'nowrap',
        }}
      >
        {TICKER_ITEMS.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.55em',
              textTransform: 'uppercase',
              color: item === '·' ? 'var(--gold)' : 'var(--cocoa-pale)',
              flexShrink: 0,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
