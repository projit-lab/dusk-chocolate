export interface Product {
  id: number;
  name: string;
  ingredients: string;
  description: string;
  emoji: string;
  bg: string;
  category: 'herbal' | 'floral' | 'matcha' | 'vanilla' | 'coffee' | 'nuts' | 'salt';
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
    ingredients: 'Cocoa · Pink Salt · Ashwagandha · Honey',
    description:
      'Our flagship bar. A deep, mineral-rich chocolate balanced by pink Himalayan salt and calming ashwagandha. The bar that started it all.',
    emoji: '🍫',
    bg: '#1A0800',
    category: 'salt',
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
    category: 'floral',
    basePrice: 130,
    image: '/images/rose-cardamom.png',
    badge: 'Floral',
  },
  {
    id: 3,
    name: 'Zen Matcha',
    ingredients: 'Cocoa · Ceremonial Matcha · L-Theanine · Honey',
    description:
      'Our most calming bar. Ceremonial-grade matcha woven through chocolate, boosted with L-theanine for deep, focused calm.',
    emoji: '🍵',
    bg: '#0E2A12',
    category: 'matcha',
    basePrice: 140,
    image: '/images/zen-matcha.png',
    badge: 'Calming',
  },
  {
    id: 4,
    name: 'Holy Basil',
    ingredients: 'Cocoa · Tulsi · Honey · Ashwagandha',
    description:
      'Earthy and grounding. Tulsi meets rich cocoa for a bar that soothes anxiety and supports your body\'s natural rhythm.',
    emoji: '🌿',
    bg: '#0A2008',
    category: 'herbal',
    basePrice: 115,
    image: '/images/holy-basil-dark.png',
    badge: 'Adaptogenic',
  },
  {
    id: 5,
    name: 'Smoked Vanilla',
    ingredients: 'Cocoa · Bourbon Vanilla · Smoked Salt · Honey',
    description:
      'Rich and indulgent. Our most luxurious bar elevated with hand-scraped Bourbon vanilla and a whisper of smoked sea salt.',
    emoji: '✨',
    bg: '#2A1206',
    category: 'vanilla',
    basePrice: 150,
    image: '/images/smoked-vanilla.png',
    badge: 'Indulgent',
  },
  {
    id: 6,
    name: 'Cocoa & Carafe',
    ingredients: 'Cocoa · Cold Brew · Cacao Nibs · Honey',
    description:
      'Deep and layered. Rich cocoa meets a slow-dripped carafe brew — dark cacao nibs add texture, honey rounds the finish. A bar with presence.',
    emoji: '☕',
    bg: '#120602',
    category: 'coffee',
    basePrice: 135,
    image: '/images/cocoa-carafe.png',
    badge: 'Bold',
  },
  {
    id: 7,
    name: 'NutLuxe',
    ingredients: 'Cocoa · Cashews · Almonds · Pistachios · Honey',
    description:
      'A celebration of premium roasted nuts. Whole cashews, almonds, and pistachios folded into honey-sweetened chocolate for an indulgent, textured experience.',
    emoji: '🥜',
    bg: '#2C1404',
    category: 'nuts',
    basePrice: 145,
    image: '/images/nutluxe.png',
    badge: 'Premium',
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
      'The full collection. All 7 flavours, fully customised. Presented in our signature matte gift box with a handwritten note.',
    emoji: '👑',
    bars: 7,
    price: 899,
    details: '7 bars · full collection',
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
