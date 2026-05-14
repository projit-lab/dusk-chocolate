import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop — dusk. chocolates',
  description: 'Browse the full dusk. chocolates collection. Filter by dark, milk, white, coffee, and almond chocolate varieties.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
