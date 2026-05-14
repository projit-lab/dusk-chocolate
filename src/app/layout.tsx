import type { Metadata } from 'next';
import './globals.css';
import ScrollRestorer from '@/components/ScrollRestorer';

export const metadata: Metadata = {
  title: 'dusk. chocolates — Guilt-Free Artisanal Chocolate from Chennai',
  description:
    'Premium artisanal chocolates crafted with raw honey and adaptogenic herbs. No refined sugar. No guilt. Ashwagandha, tulsi, rose, and chamomile — made in Chennai.',
  keywords: ['artisan chocolate', 'honey sweetened', 'adaptogenic chocolate', 'guilt free chocolate', 'Chennai chocolates', 'ashwagandha chocolate'],
  openGraph: {
    title: 'dusk. chocolates',
    description: 'Chocolate the way nature intended. Crafted with raw honey and adaptogenic herbs.',
    url: 'https://duskchocolates.in',
    siteName: 'dusk. chocolates',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollRestorer />
        {children}
      </body>
    </html>
  );
}

