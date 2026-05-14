'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/lib/data';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  changeQty: (key: string, delta: number) => void;
  clearCart: () => void;
  openBag: () => void;
  closeBag: () => void;
  toggleBag: () => void;
  subtotal: () => number;
  totalCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.key === item.key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === item.key ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      changeQty: (key, delta) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
            .filter((i) => i.qty > 0),
        })),

      clearCart: () => set({ items: [] }),
      openBag: () => set({ isOpen: true }),
      closeBag: () => set({ isOpen: false }),
      toggleBag: () => set((state) => ({ isOpen: !state.isOpen })),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),

      totalCount: () =>
        get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: 'dusk-cart' }
  )
);
