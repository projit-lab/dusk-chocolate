export interface Product {
  id: number;
  name: string;
  ingredients: string;
  description: string;
  emoji: string;
  bg: string;
  category: 'dark' | 'milk' | 'white' | 'coffee' | 'almond';
  basePrice: number;
  image: string;
  badge: string;
}

export interface CartItem {
  key: string;
  id: number;
  name: string;
  variant: string;
  size: 'Small Bar' | 'Big Bar';
  price: number;
  qty: number;
  emoji: string;
  image: string;
}

export interface GiftBox {
  id: string;
  name: string;
  description: string;
  emoji: string;
  bars: number;
  price: number;
  details: string;
}

export const SIZE_MULTIPLIERS: Record<string, number> = {
  small: 1,
  big: 1.6,
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Himalayan Sea Salt',
    ingredients: '75% Cocoa · Pink Salt · Ashwagandha · Honey',
    description:
      'Our flagship dark bar. A deep, mineral-rich 75% cocoa chocolate balanced by pink Himalayan salt and calming ashwagandha. The chocolate that started it all.',
    emoji: '🍫',
    bg: '#1A0800',
    category: 'dark',
    basePrice: 110,
    image: '/images/himalayan-sea-salt.png',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Rose & Cardamom',
    ingredients: 'Organic Cocoa · Rose Petals · Cardamom · Honey',
    description:
      'Floral and warm. Organic cocoa infused with Damask rose and green cardamom — a sensory journey through a garden at twilight.',
    emoji: '🌸',
    bg: '#3A0E20',
    category: 'dark',
    basePrice: 130,
    image: '/images/rose-cardamom.png',
    badge: 'Floral',
  },
  {
    id: 3,
    name: 'Zen Matcha',
    ingredients: 'White Chocolate · Ceremonial Matcha · L-Theanine',
    description:
      'Our most calming bar. Ceremonial-grade matcha meets creamy white chocolate, boosted with L-theanine for deep, focused calm.',
    emoji: '🍵',
    bg: '#0E2A12',
    category: 'white',
    basePrice: 140,
    image: '/images/zen-matcha.png',
    badge: 'Calming',
  },
  {
    id: 4,
    name: 'Holy Basil Dark',
    ingredients: '65% Cocoa · Tulsi · Honey · Ashwagandha',
    description:
      'Earthy and grounding. Tulsi meets 65% medium-dark cocoa for a bar that soothes anxiety and supports your body\'s natural rhythm.',
    emoji: '🌿',
    bg: '#0A2008',
    category: 'dark',
    basePrice: 115,
    image: '/images/holy-basil-dark.png',
    badge: 'Adaptogenic',
  },
  {
    id: 5,
    name: 'Smoked Vanilla',
    ingredients: 'Milk Chocolate · Bourbon Vanilla · Smoked Salt',
    description:
      'Rich and indulgent. Our creamiest milk chocolate bar elevated with hand-scraped Bourbon vanilla and a whisper of smoked sea salt.',
    emoji: '✨',
    bg: '#2A1206',
    category: 'milk',
    basePrice: 150,
    image: '/images/smoked-vanilla.png',
    badge: 'Indulgent',
  },
  {
    id: 6,
    name: 'Golden Espresso',
    ingredients: '70% Dark Chocolate · Arabica Coffee · Honey · Cinnamon',
    description:
      'Wake up and savour. Single-origin Arabica woven into our 70% dark for a bar with presence, warmth, and a clean finish.',
    emoji: '☕',
    bg: '#120602',
    category: 'coffee',
    basePrice: 135,
    image: '/images/golden-espresso.png',
    badge: 'Energising',
  },
  {
    id: 7,
    name: 'Midnight Coffee Bliss',
    ingredients: 'Milk Chocolate · Cold Brew · Ashwagandha · Honey',
    description:
      'The softer coffee bar. Cold brew folded into silky milk chocolate with ashwagandha to keep the energy gentle and sustained.',
    emoji: '🌙',
    bg: '#1E0A02',
    category: 'coffee',
    basePrice: 125,
    image: '/images/midnight-coffee.png',
    badge: 'Mellow',
  },
  {
    id: 8,
    name: 'Velvet Almond',
    ingredients: 'Milk Chocolate · Roasted Almonds · Pink Salt · Honey',
    description:
      'Our most comforting bar. Whole roasted almonds in honey-sweetened milk chocolate — a familiar warmth that never gets old.',
    emoji: '🥜',
    bg: '#2C1404',
    category: 'almond',
    basePrice: 120,
    image: '/images/velvet-almond.png',
    badge: 'Comforting',
  },
  {
    id: 9,
    name: 'Noir Almond',
    ingredients: '72% Dark · Roasted Almonds · Ashwagandha · Smoked Salt',
    description:
      'Bold and sophisticated. Roasted almonds meet our darkest 72% cocoa, with ashwagandha and smoke for depth and drama.',
    emoji: '🖤',
    bg: '#080302',
    category: 'almond',
    basePrice: 130,
    image: '/images/noir-almond.png',
    badge: 'Bold',
  },
];

export const GIFT_BOXES: GiftBox[] = [
  {
    id: 'essential',
    name: 'The Essential',
    description:
      '3 bars of your choice. Any three flavours, any chocolate base — milk, dark, or white. A perfect first encounter with dusk.',
    emoji: '🎁',
    bars: 3,
    price: 349,
    details: '3 bars · your choice',
  },
  {
    id: 'curator',
    name: 'The Curator',
    description:
      '5 bars — all different. Our most loved gift. Mixed flavours across milk, dark, and white, packaged in a keepsake box.',
    emoji: '✨',
    bars: 5,
    price: 549,
    details: '5 bars · mixed',
  },
  {
    id: 'grand',
    name: 'The Grand Dusk',
    description:
      'The full collection. All 9 flavours, fully customised. Presented in our signature matte gift box with a handwritten note.',
    emoji: '👑',
    bars: 9,
    price: 899,
    details: '9 bars · full collection',
  },
];

export const INGREDIENTS = [
  { emoji: '🍯', name: 'Raw Honey', benefit: 'Natural Sweetener' },
  { emoji: '🌿', name: 'Ashwagandha', benefit: 'Stress Relief' },
  { emoji: '🌸', name: 'Rose', benefit: 'Mood Lifting' },
  { emoji: '🍃', name: 'Tulsi', benefit: 'Adaptogenic' },
  { emoji: '🧂', name: 'Pink Salt', benefit: 'Mineral Rich' },
  { emoji: '☕', name: 'Arabica', benefit: 'Focus & Energy' },
  { emoji: '🫛', name: 'Cardamom', benefit: 'Digestive Aid' },
  { emoji: '💜', name: 'Chamomile', benefit: 'Calming' },
  { emoji: '🍫', name: 'Organic Cocoa', benefit: 'Antioxidant' },
];

export const DELIVERY_ZONES = [
  { zone: 'Chennai (within city)', cost: '₹50', eta: '2–3 days' },
  { zone: 'Tamil Nadu', cost: '₹80', eta: '3–5 days' },
  { zone: 'Pan India', cost: '₹120', eta: '5–7 days' },
  { zone: 'Free shipping above', cost: '₹599', eta: '—' },
  { zone: 'Cash on Delivery fee', cost: '+ ₹40', eta: '—' },
];
